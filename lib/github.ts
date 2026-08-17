/**
 * GitHub data layer — server-side, public API only.
 * No tokens, no secrets.
 *
 * Source model (approved design):
 *   LIVE    — data just fetched from the GitHub API
 *   CACHED  — recent in-memory/module result served without a new request
 *   SNAPSHOT— verified fallback used when the API is unreachable
 *
 * Language footprint is computed from ORIGINAL (non-fork) repos only.
 * Activity/heatmap is derived from REAL public event timestamps only —
 * no days are fabricated.
 */

export type GhUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  avatar_url: string;
};

export type GhRepo = {
  name: string;
  full_name: string;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string;
  description: string | null;
};

export type GhEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
};

export type GhLang = { name: string; count: number };

export type HeatmapCell = {
  day: string;
  count: number;
};

export type GithubSource = "live" | "cached" | "snapshot";

export type GithubSnapshot = {
  user: GhUser | null;
  repos: GhRepo[];
  originalCount: number;
  forkCount: number;
  languages: GhLang[];
  events: GhEvent[];
  stars: number;
  forks: number;
};

export type GithubOverview = GithubSnapshot & {
  source: GithubSource;
  lastUpdated: string;
  heatmap: HeatmapCell[];
  heatmapTotal: number;
  heatmapAvailable: boolean;
};

export const LANG_COLOR: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Kotlin: "#a97bff",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Batchfile: "#C1F12E",
  PowerShell: "#012456",
  Java: "#b07219",
  "C++": "#f34b7d",
  Go: "#00add8",
  Ruby: "#701516",
  PHP: "#4f5d95",
};

export const GH_USERNAME = "Deepankar-Siddharth";

const REVALIDATE_MS = 60 * 60 * 1000; // 1 hour

// —— Verified snapshot (2026-08-17, live API) — used only as offline fallback.
const SNAPSHOT_USER: GhUser = {
  login: "Deepankar-Siddharth",
  public_repos: 50,
  followers: 10,
  following: 16,
  created_at: "2020-05-26T00:00:00.000Z",
  html_url: "https://github.com/Deepankar-Siddharth",
  avatar_url: "https://github.com/deepankar-siddharth.png",
};

const SNAPSHOT_REPOS: GhRepo[] = [
  {
    name: "finora",
    full_name: "Deepankar-Siddharth/finora",
    fork: true,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 1,
    html_url: "https://github.com/Deepankar-Siddharth/finora",
    pushed_at: "2026-08-16T00:00:00.000Z",
    description: "Local-first personal finance dashboard.",
  },
  {
    name: "instant-ledger",
    full_name: "Deepankar-Siddharth/instant-ledger",
    fork: false,
    language: "Kotlin",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/Deepankar-Siddharth/instant-ledger",
    pushed_at: "2026-01-30T00:00:00.000Z",
    description: "Offline-only encrypted finance ledger for Android.",
  },
  {
    name: "event-sphere",
    full_name: "Deepankar-Siddharth/event-sphere",
    fork: false,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/Deepankar-Siddharth/event-sphere",
    pushed_at: "2025-05-26T00:00:00.000Z",
    description: "Full-stack event management system.",
  },
  {
    name: "Temp-RDP",
    full_name: "Deepankar-Siddharth/Temp-RDP",
    fork: false,
    language: "Batchfile",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/Deepankar-Siddharth/Temp-RDP",
    pushed_at: "2026-01-28T00:00:00.000Z",
    description: "Windows environment automation.",
  },
  {
    name: "terminal_package_collection",
    full_name: "Deepankar-Siddharth/terminal_package_collection",
    fork: false,
    language: "Shell",
    stargazers_count: 1,
    forks_count: 0,
    html_url: "https://github.com/Deepankar-Siddharth/terminal_package_collection",
    pushed_at: "2020-06-24T00:00:00.000Z",
    description: "Termux server bootstrap toolkit.",
  },
];

const SNAPSHOT_LANGS: GhLang[] = [
  { name: "JavaScript", count: 2 },
  { name: "Kotlin", count: 1 },
  { name: "Python", count: 1 },
  { name: "Shell", count: 1 },
  { name: "Batchfile", count: 1 },
  { name: "PowerShell", count: 1 },
  { name: "HTML", count: 1 },
  { name: "CSS", count: 1 },
];

// Events that carry meaningful public signal (fork/star noise excluded).
const MEANINGFUL_EVENTS = new Set([
  "PushEvent",
  "CreateEvent",
  "ReleaseEvent",
  "IssuesEvent",
  "PullRequestEvent",
  "IssueCommentEvent",
  "DeleteEvent",
  "PublicEvent",
]);

const SNAPSHOT_EVENTS: GhEvent[] = [];

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "deepankar-portfolio",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

function toLangList(repos: GhRepo[]): GhLang[] {
  const originals = repos.filter((r) => !r.fork);
  const count: Record<string, number> = {};
  originals.forEach((r) => {
    const lang = r.language || "Other";
    count[lang] = (count[lang] || 0) + 1;
  });
  return Object.entries(count)
    .map(([name, c]) => ({ name, count: c }))
    .sort((a, b) => b.count - a.count);
}

function toSnapshot(repos: GhRepo[], events: GhEvent[]): GithubSnapshot {
  // Verified counts from the last live inspection (2026-08-17).
  const originals = 13;
  return {
    user: SNAPSHOT_USER,
    repos,
    originalCount: originals,
    forkCount: 37,
    languages: SNAPSHOT_LANGS,
    events,
    stars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    forks: repos.reduce((f, r) => f + r.forks_count, 0),
  };
}

function toLiveSnapshot(
  user: GhUser,
  repos: GhRepo[],
  events: GhEvent[]
): GithubSnapshot {
  const originals = repos.filter((r) => !r.fork);
  return {
    user,
    repos,
    originalCount: originals.length,
    forkCount: repos.length - originals.length,
    languages: toLangList(repos),
    events,
    stars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    forks: repos.reduce((f, r) => f + r.forks_count, 0),
  };
}

function curateEvents(events: GhEvent[]): GhEvent[] {
  return events
    .filter((e) => MEANINGFUL_EVENTS.has(e.type))
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 5);
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Builds a ~13-week (91-day) calendar grid from REAL event timestamps.
 * Empty days stay empty — nothing is fabricated.
 */
function buildHeatmap(events: GhEvent[], now: Date): HeatmapCell[] {
  const counts = new Map<string, number>();
  events.forEach((e) => {
    const k = dayKey(e.created_at);
    counts.set(k, (counts.get(k) || 0) + 1);
  });

  const cells: HeatmapCell[] = [];
  for (let i = 90; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const k = dayKey(d.toISOString());
    cells.push({ day: k, count: counts.get(k) || 0 });
  }
  return cells;
}

// —— Module-level cache so subsequent renders in the same process
//    report CACHED instead of hitting the API again.
let moduleCache: { snapshot: GithubSnapshot; fetchedAt: number } | null = null;

export async function getGithubOverview(): Promise<GithubOverview> {
  const now = new Date();

  const curate = (
    snapshot: GithubSnapshot
  ): Omit<GithubOverview, "source" | "lastUpdated"> => {
    const events = curateEvents(snapshot.events);
    const heatmap = buildHeatmap(snapshot.events, now);
    const heatmapTotal = heatmap.reduce((s, c) => s + c.count, 0);
    return {
      ...snapshot,
      events,
      heatmap,
      heatmapTotal,
      heatmapAvailable: heatmapTotal > 0,
    };
  };

  // 1) Cached — serve a recent module-level result without a new request.
  if (moduleCache && now.getTime() - moduleCache.fetchedAt < REVALIDATE_MS) {
    return {
      ...curate(moduleCache.snapshot),
      source: "cached",
      lastUpdated: new Date(moduleCache.fetchedAt).toISOString(),
    };
  }

  // 2) Live — fetch fresh public data in parallel.
  const [user, repos, events] = await Promise.all([
    fetchJson<GhUser>(`https://api.github.com/users/${GH_USERNAME}`),
    fetchJson<GhRepo[]>(
      `https://api.github.com/users/${GH_USERNAME}/repos?per_page=100&sort=updated`
    ),
    fetchJson<GhEvent[]>(
      `https://api.github.com/users/${GH_USERNAME}/events/public?per_page=100`
    ).catch(() => null),
  ]);

  if (user && Array.isArray(repos)) {
    const snapshot = toLiveSnapshot(
      user,
      repos,
      Array.isArray(events) ? events : []
    );
    moduleCache = { snapshot, fetchedAt: now.getTime() };
    return { ...curate(snapshot), source: "live", lastUpdated: now.toISOString() };
  }

  // 3) Steady cached — API failed but we have a prior result; serve it stale.
  if (moduleCache) {
    return {
      ...curate(moduleCache.snapshot),
      source: "cached",
      lastUpdated: new Date(moduleCache.fetchedAt).toISOString(),
    };
  }

  // 4) Snapshot — verified offline fallback.
  const snapshot = toSnapshot(SNAPSHOT_REPOS, SNAPSHOT_EVENTS);
  return {
    ...curate(snapshot),
    source: "snapshot",
    lastUpdated: "2026-08-17T00:00:00.000Z",
  };
}
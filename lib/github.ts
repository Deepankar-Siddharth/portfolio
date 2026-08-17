/**
 * GitHub data layer — server-side, public API only.
 * No tokens, no secrets. Falls back to a verified snapshot when the API
 * is unreachable so the site always renders.
 * Language footprint is computed from ORIGINAL (non-fork) repos only.
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

export type GithubOverview = {
  user: GhUser | null;
  repos: GhRepo[];
  originalCount: number;
  forkCount: number;
  languages: GhLang[];
  events: GhEvent[];
  source: 'live' | 'snapshot';
  fetchedAt: string;
};

export const LANG_COLOR: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Kotlin: '#a97bff',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Batchfile: '#C1F12E',
  PowerShell: '#012456',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00add8',
  Ruby: '#701516',
  PHP: '#4f5d95',
};

const GH_USERNAME = 'Deepankar-Siddharth';

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'deepankar-portfolio',
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
    const lang = r.language || 'Other';
    count[lang] = (count[lang] || 0) + 1;
  });
  return Object.entries(count)
    .map(([name, c]) => ({ name, count: c }))
    .sort((a, b) => b.count - a.count);
}

// —— Verified snapshot (2026-08-17, live API) — used only as offline fallback.
const SNAPSHOT_USER: GhUser = {
  login: 'Deepankar-Siddharth',
  public_repos: 50,
  followers: 10,
  following: 16,
  created_at: '2020-05-26T00:00:00.000Z',
  html_url: 'https://github.com/Deepankar-Siddharth',
  avatar_url: 'https://github.com/deepankar-siddharth.png',
};

const SNAPSHOT_LANGS: GhLang[] = [
  { name: 'JavaScript', count: 2 },
  { name: 'Kotlin', count: 1 },
  { name: 'Python', count: 1 },
  { name: 'Shell', count: 1 },
  { name: 'Batchfile', count: 1 },
  { name: 'PowerShell', count: 1 },
  { name: 'HTML', count: 1 },
  { name: 'CSS', count: 1 },
];

export async function getGithubOverview(): Promise<GithubOverview> {
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
    return {
      user,
      repos,
      originalCount: repos.filter((r) => !r.fork).length,
      forkCount: repos.filter((r) => r.fork).length,
      languages: toLangList(repos),
      events: Array.isArray(events) ? events.slice(0, 14) : [],
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };
  }

  // Fallback: verified snapshot.
  return {
    user: SNAPSHOT_USER,
    repos: [],
    originalCount: 13,
    forkCount: 37,
    languages: SNAPSHOT_LANGS,
    events: [],
    source: 'snapshot',
    fetchedAt: '2026-08-17T00:00:00.000Z',
  };
}

export { GH_USERNAME };
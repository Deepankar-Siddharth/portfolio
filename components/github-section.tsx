import { getGithubOverview, LANG_COLOR, GH_USERNAME, type GhEvent, type GhLang } from "@/lib/github";
import { SITE } from "@/lib/content";
import GithubClient from "./github-client";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function fmtTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

const SOURCE_LABEL: Record<string, { label: string; dot: string }> = {
  live: { label: "Live · GitHub data", dot: "bg-acid" },
  cached: { label: "Cached · Recently fetched", dot: "bg-sky" },
  snapshot: { label: "Snapshot · Verified fallback", dot: "bg-ember" },
};

function LangBar({ langs }: { langs: GhLang[] }) {
  if (!langs.length) {
    return <p className="mono text-xs text-muted">Language data unavailable.</p>;
  }
  const total = langs.reduce((a, b) => a + b.count, 0);
  return (
    <div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-line">
        {langs.map((l) => (
          <div
            key={l.name}
            title={`${l.name}: ${l.count}`}
            style={{
              width: `${(l.count / total) * 100}%`,
              background: LANG_COLOR[l.name] || "#8b949e",
            }}
          />
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
        {langs.map((l) => (
          <li key={l.name} className="flex items-center gap-2 text-sm text-paper/85">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: LANG_COLOR[l.name] || "#8b949e" }}
              aria-hidden="true"
            />
            <span className="capitalize">{l.name.toLowerCase()}</span>
            <span className="mono ml-auto text-xs text-muted">{l.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Activity({ events }: { events: GhEvent[] }) {
  if (!events.length) {
    return (
      <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-line p-6">
        <p className="mono text-xs text-center text-muted">
          Recent public activity unavailable from the event feed.
        </p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-4">
      {events.map((e) => (
        <li
          key={e.id}
          className="flex items-center gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0"
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              e.type === "PushEvent" ? "bg-acid" : "bg-paper/40"
            }`}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="mono text-xs uppercase tracking-[0.14em] text-paper/90">
              {e.type.replace(/Event$/, "")}
            </p>
            <p className="truncate text-sm text-muted">
              {e.repo.name.replace("Deepankar-Siddharth/", "")}
            </p>
          </div>
          <span className="mono shrink-0 text-[10px] uppercase text-muted">
            {fmtDate(e.created_at)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function GithubSection() {
  const data = await getGithubOverview();
  const user = data.user;
  const sourceMeta = SOURCE_LABEL[data.source] || SOURCE_LABEL.snapshot;

  const stats = [
    { label: "Repositories", value: user?.public_repos ?? "—" },
    { label: "Followers", value: user?.followers ?? "—" },
    { label: "Following", value: user?.following ?? "—" },
    { label: "Stars", value: data.stars },
    { label: "Forks", value: data.forks },
    { label: "Original repos", value: data.originalCount ?? "—" },
    { label: "Since", value: user ? fmtDate(user.created_at).replace(/^\w+\s/, "") : "2020" },
  ];

  return (
    <section id="github" className="section section-ink text-paper" aria-labelledby="github-heading">
      <div className="container-x py-28 md:py-40">
        <div className="mb-16 grid gap-8 md:grid-cols-2" data-reveal>
          <div>
            <p className="overline mb-4">05 · GitHub</p>
            <h2 id="github-heading" className="display-2">
              The
              <br />
              <span className="text-outline">evidence</span>
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 self-end">
            <div>
              <p className="lede max-w-sm">
                Live public data from{" "}
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u text-paper"
                >
                  @{GH_USERNAME}
                </a>
                . Language footprint counts original repositories only — forks
                are excluded.
              </p>
              <div className="mt-6 flex flex-col items-start gap-1.5">
                <span className="mono flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.16em]">
                  <span className={`h-1.5 w-1.5 rounded-full ${sourceMeta.dot}`} aria-hidden="true" />
                  {sourceMeta.label}
                </span>
                <p className="mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Last updated: {fmtTime(data.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12" data-reveal>
          <GithubClient
            stats={stats}
            heatmap={data.heatmap}
            heatmapTotal={data.heatmapTotal}
            heatmapAvailable={data.heatmapAvailable}
          />

          {/* Account card */}
          <div className="flex flex-col justify-between gap-6 rounded-xl border border-line p-6 lg:col-span-5">
            <div>
              <p className="overline mb-2">Account</p>
              <p className="display-md">Since {fmtDate(user?.created_at ?? "").replace(/^\w+\s/, "")}</p>
              <p className="mt-3 text-sm text-muted">
                @{GH_USERNAME} — created{" "}
                {user ? fmtDate(user.created_at) : "2020"}.
              </p>
            </div>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic mono self-start border border-line px-5 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:border-acid hover:text-acid"
            >
              View GitHub <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Language + curated activity */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12" data-reveal>
          <div className="rounded-xl border border-line p-6 lg:col-span-6">
            <p className="overline mb-6">Languages across original repositories</p>
            <LangBar langs={data.languages} />
          </div>
          <div className="rounded-xl border border-line p-6 lg:col-span-6">
            <p className="overline mb-6">Recent public activity</p>
            <Activity events={data.events} />
          </div>
        </div>
      </div>
    </section>
  );
}
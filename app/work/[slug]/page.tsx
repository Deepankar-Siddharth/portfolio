import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, SITE } from "@/lib/content";
import ProjectVisual from "@/components/project-visual";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${project.position}`,
    description: `${project.tagline} ${project.description}`,
  };
}

export default async function WorkCaseStudy(props: PageProps) {
  const { slug } = await props.params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <section className="section container-x pb-16 pt-36 text-paper md:pb-24 md:pt-44">
        <Link
          href="/#work"
          className="btn-magnetic mono mb-16 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted"
        >
          <span aria-hidden="true">←</span> All work
        </Link>

        <p className="overline mb-6">
          {project.index} · {project.category}
        </p>
        <h1 className="display block leading-[0.9]">
          {project.title}
        </h1>

        <p className="lede mt-8 max-w-2xl">{project.headline}</p>

        <div className="mt-6 flex flex-wrap gap-3 mono text-xs uppercase tracking-[0.18em] text-muted">
          <span>{project.position}</span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span>{project.status}</span>
        </div>
      </section>

      {/* Visual */}
      <section className="container-x pb-16">
        <div className="h-64 overflow-hidden rounded-2xl md:h-[26rem]">
          <div className="h-full w-full">
            <ProjectVisual kind={project.visual} />
          </div>
        </div>
        <p className="mono mt-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          Abstract project visual — not a screenshot.
        </p>
      </section>

      {/* Case study body */}
      <section className="container-x pb-20 text-paper">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="overline">Overview</p>
          </div>
          <div className="md:col-span-8">
            <p className="lede text-paper max-w-2xl">{project.description}</p>
          </div>
        </div>

        <div className="my-16 divider" />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="overline">Challenge</p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed text-paper/85">
              {project.problem}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="my-16 divider" />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="overline">Engineering</p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed text-paper/85">
              {project.engineering}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="mono rounded-full border border-line px-3 py-1 text-[11px] text-paper/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="my-16 divider" />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="overline">Contribution</p>
          </div>
          <div className="md:col-span-8">
            {project.foundation && (
              <div>
                <p className="mono text-xs uppercase tracking-[0.18em] text-acid">
                  Foundation
                </p>
                <p className="mt-3 max-w-2xl text-paper/85">
                  {project.foundation.note}{" "}
                  <a
                    href={project.foundation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u text-paper"
                  >
                    {project.foundation.name}
                  </a>
                </p>
                <p className="mt-6 max-w-2xl text-paper/85">
                  {project.contribution}
                </p>
              </div>
            )}

            {!project.foundation && (
              <p className="max-w-2xl text-paper/85">{project.contribution}</p>
            )}

            <ul className="mt-8 space-y-3">
              {project.myWork.map((item) => (
                <li key={item} className="flex items-start gap-4 text-paper/85">
                  <span className="mono mt-0.5 text-xs text-acid">▸</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>

            {project.notes && (
              <p className="mt-8 max-w-2xl mono text-xs leading-relaxed text-muted">
                {project.notes}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA + links */}
      <section className="section-acid text-ink">
        <div className="container-x py-16 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="overline mb-3">Result</p>
              <p className="display-md">
                {project.status === "Active" ? "Live deployed application." : project.status}
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="btn-magnetic mono text-sm uppercase tracking-[0.18em] text-ink"
                >
                  {link.label}
                  <span className="btn-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="section container-x py-16 text-paper md:py-24">
        <p className="overline mb-8">Next</p>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex items-baseline justify-between border-b border-line py-6"
            >
              <span className="display-md">{p.title}</span>
              <span className="mono text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-acid">
                {p.position} →
              </span>
            </Link>
          ))}
          <Link
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-baseline justify-between py-6"
          >
            <span className="display-md text-outline">More on GitHub</span>
            <span className="mono text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-acid">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
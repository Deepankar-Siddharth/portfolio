import { SITE } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="section section-ink container-x relative overflow-hidden py-16">
      <div className="divider mb-12" />
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="overline mb-3">Deepankar Siddharth</p>
          <p className="text-sm text-muted">Software Developer</p>
        </div>
        <div className="flex flex-col gap-2 mono text-sm text-paper md:items-end">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="u self-start">
            GitHub
          </a>
          <a href={SITE.website} target="_blank" rel="noopener noreferrer" className="u self-start">
            Website
          </a>
          <a href={SITE.x} target="_blank" rel="noopener noreferrer" className="u self-start">
            X / Twitter
          </a>
        </div>
      </div>
      <div className="mt-14 flex flex-col justify-between gap-3 mono text-xs text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Deepankar Siddharth</p>
        <p>Automation · Full-Stack · Android</p>
      </div>
    </footer>
  );
}
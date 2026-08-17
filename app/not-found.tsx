import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[100svh] flex-col justify-center text-paper">
      <p className="overline mb-6">404 · Page not found</p>
      <h1 className="display text-outline">Lost</h1>
      <p className="lede mt-8 max-w-md">
        That page doesn&apos;t exist on this site. The work you&apos;re looking
        for is a case study away.
      </p>
      <Link
        href="/#work"
        className="btn-magnetic mono mt-12 self-start text-sm uppercase tracking-[0.18em]"
      >
        Back to work <span className="btn-arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
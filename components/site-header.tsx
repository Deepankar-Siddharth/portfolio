"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/content";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-90 transition-colors duration-500 ${
          scrolled && !open ? "site-header--scrolled" : ""
        }`}
      >
        <div className="container-x flex items-center justify-between py-5">
          <a
            href="#hero"
            className="btn-magnetic text-sm font-bold tracking-[0.25em] uppercase"
            onClick={close}
            aria-label="Deepankar Siddharth — home"
          >
            <span className="mono text-acid">DS</span>
            <span className="hidden sm:inline">{SITE.name}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`menu-btn mono ${open ? "is-open" : ""}`}
          >
            <span className="menu-btn-dot" aria-hidden="true" />
            <span className="menu-btn-text">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={`site-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Primary" className="container-x flex h-full flex-col justify-center">
          <ol className="list-none space-y-0">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={close}
                  className={`menu-link group flex items-baseline gap-5 py-2 ${
                    open ? "menu-link-in" : ""
                  }`}
                  style={{ transitionDelay: `${120 + i * 55}ms` }}
                >
                  <span className="mono text-xs text-muted">{item.index}</span>
                  <span className="display-md">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-2 mono text-xs text-muted">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="u self-start text-paper">
              GitHub
            </a>
            <a href={SITE.website} target="_blank" rel="noopener noreferrer" className="u self-start text-paper">
              Website
            </a>
            <a href={SITE.x} target="_blank" rel="noopener noreferrer" className="u self-start text-paper">
              X / Twitter
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
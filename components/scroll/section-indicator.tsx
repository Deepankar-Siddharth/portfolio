"use client";

import useActiveSection from "@/lib/use-active-section";

const ITEMS = [
  { index: "01", label: "Work", href: "#work", id: "work" },
  { index: "02", label: "Build", href: "#build", id: "build" },
  { index: "03", label: "Stack", href: "#stack", id: "stack" },
  { index: "04", label: "GitHub", href: "#github", id: "github" },
  { index: "05", label: "Journey", href: "#journey", id: "journey" },
  { index: "06", label: "About", href: "#about", id: "about" },
  { index: "07", label: "Contact", href: "#contact", id: "contact" },
];

/**
 * Editorial section rail — fixed to the right edge on md+ screens.
 * Only the section currently in view is emphasized (number scales up,
 * label expands). Anchor links for keyboard + touch.
 */
export default function SectionIndicator() {
  const active = useActiveSection();

  return (
    <nav aria-label="Section index" className="section-indicator">
      {ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            aria-current={isActive ? "true" : undefined}
            className={isActive ? "is-active" : ""}
          >
            <span className="ind">{item.index}</span>
            <span className="lbl">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

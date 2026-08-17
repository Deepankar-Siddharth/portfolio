import type { MetadataRoute } from "next";
import { SITE, PROJECTS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cases = PROJECTS.map((p) => ({
    url: `${SITE.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...cases,
  ];
}
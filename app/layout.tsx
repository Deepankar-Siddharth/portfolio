import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SITE } from "@/lib/content";
import Cursor from "@/components/cursor";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollProgress from "@/components/scroll/scroll-progress";
import SectionIndicator from "@/components/scroll/section-indicator";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  url: SITE.url,
  sameAs: [SITE.github, SITE.website, SITE.x],
  knowsAbout: ["Automation", "Full-Stack Development", "Android", "Privacy-focused software"],
};

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Deepankar Siddharth — Software Developer · Automation · Full-Stack · Android",
    template: "%s | Deepankar Siddharth",
  },
  description:
    "Deepankar Siddharth is a software developer building practical products, automation tools, full-stack applications and privacy-focused software.",
  keywords: [
    "Deepankar Siddharth",
    "Software Developer",
    "Full-Stack",
    "Android",
    "Automation",
    "Privacy",
    "Kotlin",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Deepankar Siddharth", url: SITE.github }],
  creator: "Deepankar Siddharth",
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title:
      "Deepankar Siddharth — Software Developer · Automation · Full-Stack · Android",
    description:
      "Deepankar Siddharth is a software developer building practical products, automation tools, full-stack applications and privacy-focused software.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Deepankar Siddharth — Software Developer · Automation · Full-Stack · Android",
    description:
      "Deepankar Siddharth is a software developer building practical products, automation tools, full-stack applications and privacy-focused software.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

export const viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <div className="skip-link-wrap">
          <a className="skip-link" href="#main">
            Skip to main content
          </a>
        </div>
        <ScrollProgress />
        <SectionIndicator />
        <MotionConfig reducedMotion="user">
          <Cursor />
          <SiteHeader />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionConfig>
      </body>
    </html>
  );
}
# Deepankar Siddharth — Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-deepankar--portfolio--xi.vercel.app-brightgreen?style=for-the-badge)](https://deepankar-portfolio-xi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&style=for-the-badge)](https://vercel.com/)

> **🔗 Live URL:** [https://deepankar-portfolio-xi.vercel.app/](https://deepankar-portfolio-xi.vercel.app/)

A modern, interactive portfolio website showcasing Deepankar Siddharth's work as a software developer specializing in **Automation**, **Full-Stack Development**, and **Android** applications. Built with Next.js 16, TypeScript, Tailwind CSS v4, and featuring immersive 3D animations powered by Three.js and Framer Motion.

---

## 🌟 Features

### Design & UX
- **Editorial Typography**: Oversized display type using Archivo and Space Mono fonts
- **Dark Theme**: Near-black ink (#0a0a0b) with warm paper (#f4efe6) and electric acid (#d8ff3e) accents
- **Custom Cursor**: Interactive cursor system that responds to hover states
- **Smooth Animations**: Sophisticated scroll-based animations and parallax effects
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes
- **Reduced Motion Support**: Respects user's motion preferences for accessibility

### Interactive Elements
- **3D Hero Section**: Three.js-powered animated sphere with mouse-tracking parallax
- **Scroll Progress Indicator**: Visual feedback showing reading progress through sections
- **Section Navigation**: Dynamic section indicators and smooth scroll navigation
- **Reveal Animations**: Content reveals on scroll with staggered timing
- **GitHub Integration**: Live GitHub stats fetched via API (repos, followers, stars, forks)

### Sections
1. **Hero**: Animated introduction with 3D element and rotating identity markers
2. **Intro**: Personal introduction and positioning statement
3. **Work**: Featured projects (Finora, Instant Ledger, Event Sphere) with detailed case studies
4. **Build**: Engineering philosophy and approach
5. **Stack**: Technology stack showcase
6. **GitHub**: Live GitHub activity and contributions
7. **Journey**: Career timeline from 2020 to present
8. **About**: Detailed about section with current focus areas
9. **Contact**: Contact information and social links

### Technical Highlights
- **Server Components**: Async data fetching for GitHub stats in server components
- **SEO Optimized**: Comprehensive metadata, Open Graph tags, Twitter cards, and JSON-LD structured data
- **Performance**: Font optimization, reduced motion support, and efficient animations
- **Type Safety**: Full TypeScript implementation with strict typing
- **Modern Styling**: Tailwind CSS v4 with custom design tokens

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16.3.1 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Animation** | Motion (Framer Motion), Three.js, React Three Fiber, Drei |
| **Fonts** | Archivo (variable), Space Mono |
| **Deployment** | Vercel |
| **Linting** | ESLint 9.x |

### Dependencies
```json
{
  "dependencies": {
    "@react-three/drei": "^10.7.8",
    "@react-three/fiber": "^9.7.0",
    "motion": "^13.1.0",
    "next": "16.3.1",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "three": "^0.185.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 📁 Project Structure

```
/workspace
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata, fonts, providers
│   ├── page.tsx             # Home page assembling all sections
│   ├── globals.css          # Global styles and design tokens
│   ├── robots.ts            # Robots.txt configuration
│   ├── sitemap.ts           # Sitemap generation
│   ├── not-found.tsx        # Custom 404 page
│   └── work/[slug]/         # Dynamic project detail pages
├── components/              # React components
│   ├── hero.tsx            # Hero section with 3D animation
│   ├── intro.tsx           # Introduction section
│   ├── work.tsx            # Projects showcase
│   ├── build.tsx           # Engineering philosophy
│   ├── stack.tsx           # Technology stack
│   ├── journey.tsx         # Career timeline
│   ├── about.tsx           # About section
│   ├── contact.tsx         # Contact section
│   ├── github-section.tsx  # GitHub integration
│   ├── site-header.tsx     # Navigation header
│   ├── site-footer.tsx     # Footer component
│   ├── cursor.tsx          # Custom cursor
│   ├── three-element.tsx   # Three.js 3D element
│   ├── scene.tsx           # 3D scene setup
│   └── scroll/             # Scroll-related components
│       ├── scroll-progress.tsx
│       ├── section-indicator.tsx
│       └── reveals.tsx
├── lib/                     # Utilities and data
│   ├── content.ts          # All site content (projects, journey, stack)
│   ├── github.ts           # GitHub API integration
│   ├── use-reveal.ts       # Scroll reveal hook
│   ├── use-pinned-mode.ts  # Pinning animation hook
│   └── use-active-section.ts # Active section detection
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── postcss.config.mjs      # PostCSS configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd deepankar-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables (if needed)**
   
   Create a `.env.local` file for GitHub API token (optional, for higher rate limits):
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see your local development version.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🎨 Design System

### Color Palette
```css
--color-ink: #0a0a0b;        /* Near-black background */
--color-ink-2: #131316;      /* Secondary dark */
--color-ink-3: #1b1b20;      /* Tertiary dark */
--color-paper: #f4efe6;      /* Warm paper text */
--color-paper-2: #ece5d6;    /* Secondary paper */
--color-muted: #9a9589;      /* Muted text */
--color-line: rgba(244, 239, 230, 0.14); /* Borders */
--color-acid: #d8ff3e;       /* Electric accent */
--color-ember: #ff5a36;      /* Orange accent */
--color-sky: #7dd3fc;        /* Blue accent */
--color-violet: #a78bfa;     /* Purple accent */
```

### Typography
- **Display Font**: Archivo (variable weight, condensed)
- **Mono Font**: Space Mono (400, 700)
- **Font Sizes**: Editorial scale with oversized headings (leading: 0.86-0.92)

### Animation Principles
- **Easing**: Custom cubic-bezier (0.16, 1, 0.3, 1) for smooth, natural motion
- **Parallax**: Multi-layer depth effects based on mouse position
- **Scroll Triggers**: Content reveals tied to scroll position
- **Reduced Motion**: Full support for `prefers-reduced-motion`

---

## 📦 Featured Projects

### 1. Finora
- **Category**: Web App · Local-first finance
- **Stack**: React, TypeScript, Tailwind CSS, Recharts, React Router
- **Description**: A local-first personal finance dashboard running entirely in the browser with PIN-protected local profile
- **Live**: [deepankar-siddharth.github.io/finora/](https://deepankar-siddharth.github.io/finora/)

### 2. Instant Ledger
- **Category**: Android · Privacy-first finance
- **Stack**: Kotlin, Jetpack Compose, Room, SQLCipher, Hilt, WorkManager
- **Description**: Offline-only personal finance ledger for Android with SMS parsing and on-device encryption
- **Source**: [github.com/Deepankar-Siddharth/instant-ledger](https://github.com/Deepankar-Siddharth/instant-ledger)

### 3. Event Sphere
- **Category**: Full-Stack · Event management
- **Stack**: React, Node.js, Express, MySQL, JWT
- **Description**: Full-stack event management platform for bookings, employees, packages and services
- **Source**: [github.com/Deepankar-Siddharth/event-sphere](https://github.com/Deepankar-Siddharth/event-sphere)

---

## 🔌 GitHub Integration

The portfolio fetches live GitHub statistics including:
- Public repositories count
- Followers and following counts
- Total stars and forks across all repositories
- Account creation year ("building since")

Data is fetched server-side using the GitHub REST API v3. For extended rate limits, configure a `GITHUB_TOKEN` environment variable.

---

## 🌐 SEO & Metadata

### Implemented SEO Features
- ✅ Dynamic metadata with templates
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support (summary_large_image)
- ✅ JSON-LD structured data (Person schema)
- ✅ Canonical URLs
- ✅ Robots.txt configuration
- ✅ XML Sitemap generation
- ✅ Semantic HTML structure
- ✅ ARIA labels for accessibility

### Metadata Configuration
Located in `app/layout.tsx`:
- Title: "Deepankar Siddharth — Software Developer · Automation · Full-Stack · Android"
- Description: Comprehensive description of expertise and focus areas
- Keywords: Developer-focused SEO keywords
- Author: Deepankar Siddharth
- Theme Color: #0a0a0b (dark mode optimized)

---

## 🚢 Deployment

### Deploy on Vercel

This portfolio is optimized for deployment on [Vercel](https://vercel.com/):

1. **Push to Git**: Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables** (optional):
   - Add `GITHUB_TOKEN` for extended GitHub API rate limits

4. **Deploy**: Click "Deploy" — Vercel handles the rest!

### Production Build Locally

```bash
npm run build
npm run start
```

---

## ♿ Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **Skip Links**: "Skip to main content" link for keyboard users
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **ARIA Labels**: Descriptive labels for interactive elements
- **Focus Management**: Visible focus states for keyboard navigation
- **Color Contrast**: High contrast ratios meeting WCAG guidelines

---

## 📄 License

This portfolio is personal property. All rights reserved.

The code, design, and content are proprietary to Deepankar Siddharth. Unauthorized copying, distribution, or reproduction is prohibited.

---

## 👤 About

**Deepankar Siddharth**  
Software Developer based in India

- **Specializations**: Automation, Full-Stack Development, Android
- **Focus Areas**: Local-first architecture, privacy-aware development, product design
- **GitHub**: [@Deepankar-Siddharth](https://github.com/Deepankar-Siddharth)
- **Website**: [deepankar.is-a.dev](https://deepankar.is-a.dev)
- **Twitter**: [@DeepankarZino](https://twitter.com/DeepankarZino)

---

## 🙏 Acknowledgments

- **Fonts**: Archivo by Google Fonts, Space Mono by Google Fonts
- **Icons**: Custom SVG implementations
- **3D Library**: React Three Fiber and Drei ecosystems
- **Hosting**: Powered by Vercel

---

## 📞 Contact

Have an idea worth building? Let's talk.

- **GitHub**: [github.com/Deepankar-Siddharth](https://github.com/Deepankar-Siddharth)
- **Website**: [deepankar.is-a.dev](https://deepankar.is-a.dev)
- **X/Twitter**: [twitter.com/DeepankarZino](https://twitter.com/DeepankarZino)

---

<p align="center">
  <strong>Built with ❤️ using Next.js, TypeScript, and Three.js</strong>
</p>

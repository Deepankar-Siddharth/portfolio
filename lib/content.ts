/**
 * Verified content for Deepankar Siddharth's new portfolio.
 *
 * Every statement below is grounded in the existing portfolio's evidence,
 * live GitHub API data, and repository inspection. Nothing is invented.
 * Temp-RDP is described only as "Windows environment automation using
 * GitHub Actions and tunneling infrastructure" — its repository README
 * contains credentials that must NEVER appear here.
 */

export const SITE = {
  name: 'Deepankar Siddharth',
  firstName: 'Deepankar',
  lastName: 'Siddharth',
  title: 'Software Developer',
  roles: ['Automation', 'Full-Stack', 'Android'],
  tagline:
    'Software developer building practical products, automation tools, full-stack applications and privacy-focused software.',
  url: 'https://deepankar-portfolio-five.vercel.app',
  github: 'https://github.com/Deepankar-Siddharth',
  githubHandle: 'Deepankar-Siddharth',
  website: 'https://deepankar.is-a.dev',
  x: 'https://twitter.com/DeepankarZino',
  avatar: 'https://github.com/deepankar-siddharth.png',
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  position: string;
  year: string;
  index: string;
  headline: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  engineering: string;
  notes?: string;
  contribution: string;
  myWork: string[];
  foundation?: { name: string; url: string; note: string };
  features?: string[];
  briefProblem: string;
  briefContribution: string;
  briefEngineering: string;
  briefResult: string;
  stack: string[];
  links: { label: string; href: string; external: boolean }[];
  status: string;
  visual: 'finora' | 'ledger' | 'sphere';
};

export const PROJECTS: Project[] = [
  {
    slug: 'finora',
    title: 'Finora',
    category: 'Web App · Local-first finance',
    position: 'Extended & deployed',
    year: '2026',
    index: '01',
    headline: 'A local-first personal finance dashboard.',
    tagline: 'Income, expenses, budgets and savings — living in your browser.',
    description:
      'Finora is a personal finance dashboard that runs entirely in the browser with a PIN-protected local profile. The original foundation was created by Nayra Singh; Deepankar’s fork extends it with authentication, privacy and deployment work, then ships it as a live GitHub Pages app.',
    problem:
      'Meaningful budgeting usually means trusting a backend with your financial data.',
    solution:
      'A local-first dashboard where transactions, budgets and savings live in your browser, protected by a local PIN — no account, no tracking.',
    engineering:
      'React, TypeScript, Tailwind CSS, Recharts and React Router — a Vite single-page app with localStorage persistence.',
    contribution:
      'Deepankar’s fork extends the foundation with authentication, privacy, sync and deployment work. The original dashboard, budgets, analytics and CSV features belong to the foundation.',
    myWork: [
      'Local PIN authentication',
      'Authentication error handling',
      'Encrypted cross-device sync',
      'Deployment on GitHub Pages',
      'Secret & documentation hardening',
      'Demo-data cleanup',
    ],
    briefProblem: 'Solving privacy + local-first finance',
    briefContribution: 'Auth · Sync · Deployment · Hardening',
    briefEngineering: 'React · TypeScript · Tailwind · Recharts · React Router',
    briefResult: 'Live deployed application',
    foundation: {
      name: 'nayra-singh/finora',
      url: 'https://github.com/nayra-singh/finora',
      note: 'Original foundation by Nayra Singh.',
    },
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Router'],
    links: [
      {
        label: 'Live demo',
        href: 'https://deepankar-siddharth.github.io/finora/',
        external: true,
      },
      {
        label: 'View source',
        href: 'https://github.com/Deepankar-Siddharth/finora',
        external: true,
      },
      {
        label: 'Original project',
        href: 'https://github.com/nayra-singh/finora',
        external: true,
      },
    ],
    status: 'Active',
    visual: 'finora',
  },
  {
    slug: 'instant-ledger',
    title: 'Instant Ledger',
    category: 'Android · Privacy-first finance',
    position: 'Original · Android',
    year: '2026',
    index: '02',
    headline: 'Offline-only finance ledger for Android.',
    tagline: 'SMS parsing, on-device encryption, no cloud.',
    description:
      'A privacy-first, offline-only personal finance ledger for Android. It captures transactions automatically from bank SMS and keeps them encrypted on-device with SQLCipher — no cloud, no accounts, no telemetry.',
    problem:
      'Banking data is sensitive — most finance apps upload it to a server.',
    solution:
      'A ledger that parses bank SMS on the device, stores every record with SQLCipher encryption and never sends data anywhere.',
    engineering:
      'Kotlin, Jetpack Compose, Room, SQLCipher, Hilt and WorkManager, with Material 3 UI.',
    contribution:
      'Original project — architecture, data layer and UI built by Deepankar.',
    myWork: [
      'Offline-only data model',
      'SQLCipher encryption at rest',
      'SMS transaction capture',
      'Biometric & PIN lock',
      'CSV & JSON export',
    ],
    features: [
      'SMS parsing',
      'SQLCipher encryption',
      'Biometric & PIN lock',
      'CSV export',
      'JSON export',
    ],
    briefProblem: 'Banking data stays on the device',
    briefContribution: 'Original — data layer, UI, encryption',
    briefEngineering: 'Kotlin · Compose · Room · SQLCipher',
    briefResult: 'Recent Android product',
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'Room',
      'SQLCipher',
      'Hilt',
      'WorkManager',
      'Material 3',
    ],
    links: [
      {
        label: 'View source',
        href: 'https://github.com/Deepankar-Siddharth/instant-ledger',
        external: true,
      },
    ],
    status: 'Recent product',
    visual: 'ledger',
  },
  {
    slug: 'event-sphere',
    title: 'Event Sphere',
    category: 'Full-Stack · Event management',
    position: 'Original · Full-Stack',
    year: '2025',
    index: '03',
    headline: 'A full-stack event management platform.',
    tagline: 'Bookings, employees, packages and services in one system.',
    description:
      'Event Sphere is a full-stack event management platform for bookings, employees, packages and services — with a JWT-authenticated React frontend and a Node.js/Express + MySQL backend.',
    problem:
      'Event businesses juggle bookings, staff, services and invoices across spreadsheets.',
    solution:
      'One platform for user management, event booking, employee management, services, payments and reporting.',
    engineering:
      'React frontend, Node.js/Express REST API, MySQL database and JWT authentication.',
    contribution: 'Original project — both client and server built by Deepankar.',
    myWork: [
      'JWT-authenticated API',
      'React SPA frontend',
      'MySQL schema & queries',
      'Booking & reporting flows',
    ],
    briefProblem: 'Scattered event operations',
    briefContribution: 'Original client + server',
    briefEngineering: 'React · Node.js · Express · MySQL',
    briefResult: 'Original full-stack system',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
    links: [
      {
        label: 'View source',
        href: 'https://github.com/Deepankar-Siddharth/event-sphere',
        external: true,
      },
    ],
    status: 'Maintained',
    visual: 'sphere',
  },
];

export const ENGINEERING = [
  {
    phrase: 'I build products.',
    body: 'Applications designed around real user workflows.',
    evidence: ['Finora', 'Instant Ledger'],
  },
  {
    phrase: 'I build automation.',
    body: 'Tools that remove repetitive manual work.',
    evidence: ['Temp-RDP', 'Terminal Package Collection'],
  },
  {
    phrase: 'I build full-stack systems.',
    body: 'Frontend, API and database working as one system.',
    evidence: ['Event Sphere'],
  },
  {
    phrase: 'I build Android apps.',
    body: 'Native applications with offline / local-first architecture.',
    evidence: ['Instant Ledger'],
  },
  {
    phrase: 'I build developer tooling.',
    body: 'Scripts, packages and provisioning that make environments repeatable.',
    evidence: ['Terminal Package Collection', 'Temp-RDP', 'verified tooling repos'],
  },
];

export type StackItem = {
  name: string;
  usedIn: string;
};

export const STACK: StackItem[] = [
  { name: 'JavaScript', usedIn: 'Event Sphere · dark web projects' },
  { name: 'TypeScript', usedIn: 'Finora' },
  { name: 'Python', usedIn: 'Telegram tooling' },
  { name: 'Kotlin', usedIn: 'Instant Ledger' },
  { name: 'React', usedIn: 'Finora · Event Sphere' },
  { name: 'Node.js', usedIn: 'Event Sphere' },
  { name: 'Express', usedIn: 'Event Sphere' },
  { name: 'MySQL', usedIn: 'Event Sphere' },
  { name: 'Tailwind CSS', usedIn: 'Finora' },
  { name: 'Recharts', usedIn: 'Finora' },
  { name: 'SQLCipher', usedIn: 'Instant Ledger' },
  { name: 'Jetpack Compose', usedIn: 'Instant Ledger' },
  { name: 'Room', usedIn: 'Instant Ledger' },
  { name: 'Hilt', usedIn: 'Instant Ledger' },
  { name: 'GitHub Actions', usedIn: 'Temp-RDP' },
  { name: 'Shell / Bash', usedIn: 'Terminal Package Collection' },
];

export type JourneyStep = {
  phase: string;
  title: string;
  body: string;
  tags: string[];
  period: string;
};

export const JOURNEY: JourneyStep[] = [
  {
    phase: '01 · Automation & Termux',
    title: 'Automation & Termux',
    body: 'Started the Terminal Package Collection — a Termux server-bootstrap toolkit that set an automation-first theme.',
    tags: ['Shell', 'Termux', 'Bootstrap'],
    period: '2020',
  },
  {
    phase: '02 · Python & Telegram tooling',
    title: 'Python & Telegram tooling',
    body: 'Built a Python Telegram userbot on Telethon, alongside early web experiments.',
    tags: ['Python', 'Telethon', 'Scripting'],
    period: '2021',
  },
  {
    phase: '03 · Infrastructure automation',
    title: 'Infrastructure automation',
    body: 'Shipped Temp-RDP — Windows environments provisioned through GitHub Actions and ngrok tunneling.',
    tags: ['GitHub Actions', 'Batchfile', 'Provisioning'],
    period: '2022',
  },
  {
    phase: '04 · System & web experimentation',
    title: 'System & web experimentation',
    body: 'Explored PowerShell tooling and dark-themed static web projects.',
    tags: ['PowerShell', 'HTML', 'CSS'],
    period: '2023–24',
  },
  {
    phase: '05 · Full-stack applications',
    title: 'Full-stack applications',
    body: 'Built Event Sphere — a React, Node.js/Express and MySQL full-stack system.',
    tags: ['React', 'Node.js', 'Express', 'MySQL'],
    period: '2025',
  },
  {
    phase: '06 · Product & privacy focus',
    title: 'Product & privacy focus',
    body: 'Built Instant Ledger for Android, then turned to Finora — a local-first finance app extended and deployed on GitHub Pages.',
    tags: ['Kotlin', 'Compose', 'Local-first'],
    period: '2026',
  },
];

export const FOCUS = [
  { name: 'FINORA', status: 'Active', note: 'Local-first finance dashboard' },
  { name: 'INSTANT LEDGER', status: 'Recent product', note: 'Offline, encrypted finance ledger' },
  { name: 'LOCAL-FIRST', status: 'Privacy-aware software', note: 'Data that never leaves the device' },
  { name: 'AUTOMATION', status: 'Tools & workflows', note: 'GitHub Actions, scripts, provisioning' },
];

export const ABOUT = {
  statement:
    'I like turning ideas and repetitive workflows into software people can actually use.',
  paragraphs: [
    'I am Deepankar Siddharth, a software developer based in India working across automation, full-stack and Android. Since 2020 I have been building tools that remove manual work — from Termux bootstrapping to GitHub Actions provisioning.',
    'My projects lean practical and privacy-minded: an offline-only encrypted finance ledger, a local-first finance dashboard, and a full-stack event management system. I care about software that respects the person using it — local-first where possible, no unnecessary data sharing.',
    'Currently exploring product design, local-first architecture and privacy-aware development.',
  ],
};

export const CONTACT = {
  headlines: ['Have an idea', 'worth building?', "Let's talk."],
  channels: [
    { label: 'GitHub', href: 'https://github.com/Deepankar-Siddharth', external: true },
    { label: 'Website', href: 'https://deepankar.is-a.dev', external: true },
    { label: 'X / Twitter', href: 'https://twitter.com/DeepankarZino', external: true },
  ],
};

export const NAV_ITEMS = [
  { index: '01', label: 'Work', href: '#work' },
  { index: '02', label: 'Build', href: '#build' },
  { index: '03', label: 'Stack', href: '#stack' },
  { index: '04', label: 'GitHub', href: '#github' },
  { index: '05', label: 'Journey', href: '#journey' },
  { index: '06', label: 'About', href: '#about' },
  { index: '07', label: 'Contact', href: '#contact' },
];
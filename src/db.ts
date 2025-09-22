import type { Project } from "./types";

// --- Data ---
export const ABOUT_ME = {
  description: `Full-stack developer: Laravel, React / React Native, Go, and system design.\nI build marketplaces, real-time apps, and robust APIs.`,
  pdf_portfolio: '/Bekhira_Gacem_Lamine_dev_portfolio.pdf?show=true',
  skills: [
    "Laravel",
    "React",
    "React Native",
    "Go",
    "System Design",
    "MySQL",
    "PostgreSQL",
  ],
  stats: [
    {
      value: "20+",
      label: "Projects"
    },
    {
      value: "7y",
      label: "Experience"
    },
    {
      value: "3",
      label: "Frameworks"
    }
  ],
  socials: {
    email: 'gacembekhira.personal@gmail.com',
    phoneNumber: '+213558054300',
    github: 'https://github.com/Jervi-sir',
    linkedIn: 'https://www.linkedin.com/in/gacem-bekhira/',
    instagram: 'https://www.instagram.com/gacem_humen/',
    tiktok: 'https://www.tiktok.com/@what_jervi_thinks_of_dz'
  }
}

export const PROJECTS: Project[] = [

  {
    id: "p-shae",
    title: "Shae",
    subtitle: "Xano + Node proxy on legacy DB",
    description:
      "Freelance: built Node proxy to let Xano interact with a 500GB MySQL powering 6 apps; glue between legacy Laravel 5 and no-code.",
    link: "https://shaefit.com",
    year: 2025,
    skills: ["Node.js", "Xano", "MySQL", "Legacy Systems"],
  },
  {
    id: "p-petalert",
    title: "Pet Alert France",
    subtitle: "Lost pets platform + FB automation",
    description: "Rebuild with no-code (Xano backend, Webflow frontend). Facebook API automations + queueing. Migrated 4M+ records from MongoDB → PostgreSQL with Python.",
    year: 2023,
    link: "https://petalert.fr",
    skills: ["Xano", "Webflow", "Facebook API", "Python", "MongoDB", "PostgreSQL", "Cron"],
  },
  {
    id: "p-faceless",
    title: "FacelessNiches",
    subtitle: "YouTube niche analytics",
    description: "Platform that continuously analyzes YouTube niches via API; migrated from no-code to Node.js for cost/perf.",
    year: 2024,
    link: "https://facelessniches.com",
    skills: ["Node.js", "Linux", "Cron", "YouTube API", "Webflow", "Wized", "Memberstack", "PostgreSQL", "MongoDB"],
  },
  {
    id: "p1",
    title: "Mira Pet-Care Ecosystem",
    subtitle: "Marketplace + Services",
    description: "React-Native app + Laravel backend for pet listings, services, chat, and geo-search across Algerian wilayas.",
    year: 2025,
    link: "https://mira-pet-app.vercel.app/",
    repo: "#",
    skills: ["React Native", "Laravel", "PostgreSQL", "Soketi", "Soketi", "Redis", "Go", "System Design"],
  },
  {
    id: "p2",
    title: "Rafiki Motors / CarParts DZ",
    subtitle: "B2B/B2C Auto-parts Platform",
    description: "Next.js front + Laravel APIs, warehouse stock, pricing tiers, and pickup logistics for Algerian market.",
    year: 2025,
    link: "https://car.octaprize.com",
    skills: ["Next.js", "Laravel", "PostgreSQL", "Stripe", "Tailwind", "shadcn/ui"],
  },
  {
    id: "p-octaprize",
    title: "Octaprize",
    subtitle: "Social media for fashion",
    description:
      "Two RN apps (users & stores) + Laravel/Inertia backend; Go service for media upload.",
    year: 2024,
    link: "https://octaprize.com",
    skills: ["React Native", "Laravel", "Inertia", "Go"],
  },
  {
    id: "p-translify",
    title: "Translify",
    subtitle: "Document translation workflow",
    description:
      "Middle-platform between enterprises and translators. Laravel + Inertia React; Go service for large file uploads; shadcn/ui front-end polish.",
    year: "—",
    link: "https://translify.net",
    skills: ["Laravel", "React", "Inertia", "Go", "shadcn/ui"],
  },
  {
    id: "p-password",
    title: "Password Storage",
    subtitle: "Secure credentials vault",
    description:
      "Personal/project credentials manager built with Laravel + Vue.js.",
    year: "—",
    skills: ["Nextjs", "Supabase"],
  },
  {
    id: "p-pos",
    title: "POS Tool",
    subtitle: "Desktop POS via Tauri",
    description:
      "Inventory & warehouse management desktop app built with Tauri + React.",
    year: "—",
    skills: ["Tauri", "React", "SQLite"],
  },
  {
    id: "p-elwa3y",
    title: "Elwa3y.dz",
    subtitle: "News portal + mobile app",
    description:
      "Laravel/Inertia news site + React Native mobile (posting, commenting, bookmarks).",
    year: "—",
    skills: ["Laravel", "Inertia", "React", "React Native"],
  },
  {
    id: "p-wajed",
    title: "Wajed",
    subtitle: "Bac study app (DZ)",
    description:
      "RN app + Laravel backend; quiz topics, gamification; AI-assisted practice with DZ BAC content.",
    year: 2024,
    link: "https://wajed.vercel.app/",
    skills: ["React Native", "Laravel", "Gamification", "AI"],
  },
  {
    id: "p-huntproduct",
    title: "HuntProduct",
    subtitle: "Telegram ecommerce scraper",
    description:
      "Scrapes Telegram groups to collect product leads; list/save UI to find winners.",
    year: 2024,
    skills: ["Laravel", "Telegram API", "Scraping"],
  },

  {
    id: "p-dr-brand-ai",
    title: "dr-brand-ai",
    subtitle: "AI social scheduler",
    description:
      "Planner/scheduler with OpenAI-assisted idea generation and reel scripts.",
    year: 2025,
    skills: ["OpenAI", "Next.js", "Scheduling"],
  },
  {
    id: "p-travel",
    title: "Travel Agency",
    subtitle: "Offers, payments, multi-lang",
    description:
      "Laravel app with Stripe payments, auto-translation, currency conversion; deployed to Heroku.",
    year: 2021,
    skills: ["Laravel", "MySQL", "JavaScript", "Bootstrap", "Stripe", "Heroku"],
  },
  {
    id: "p-oxygen",
    title: "Volunteering – Find Oxygen",
    subtitle: "Community utility",
    description:
      "Responsive Laravel platform to coordinate resources (historical project).",
    year: 2021,
    skills: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    id: "p-skriptgg",
    title: "Skriptgg",
    subtitle: "Frontend migration for SEO",
    description:
      "Migrated React frontend to Webflow to leverage stronger SEO and authoring UX.",
    year: 2024,
    skills: ["Webflow", "SEO", "React"],
  },
  {
    id: "p-saavyworld",
    title: "Saavyworld",
    subtitle: "Personal site + e-commerce",
    description:
      "Personal brand with built-in shop as an alternative to Shopify.",
    year: 2020,
    link: "https://saavyworld.com",
    skills: ["Next.js", "E-commerce", "React", "Stripe"],
  },
  {
    id: "p-me-uat",
    title: "Maison Entrepreneuriat",
    subtitle: "Student program registration",
    description:
      "Platform for students to join Entrepreneurship programs (ANJEM). Project concluded Aug 2022; future local pivot considered.",
    year: 2022,
    link: "https://me-uat.com",
    skills: ["Laravel", "PostgreSQL", "React"],
  },

  {
    id: "p-yalidine",
    title: "Yalidine Delivery Proxy",
    subtitle: "Shared account savings",
    description:
      "Next.js tool to let users ship via my single Yalidine account to reduce return fees.",
    year: 2023,
    skills: ["Next.js", "Logistics", "API"],
  },
  {
    id: "p-visa-tracker",
    title: "Visa Tracker",
    subtitle: "Periodic site watcher + alerts",
    description:
      "Laravel scraper that monitors availability and notifies via Telegram.",
    year: 2023,
    skills: ["Laravel", "Scraping", "Telegram API", "Cron"],
  },

  {
    id: "p-boxy",
    title: "Boxy",
    subtitle: "Link-in-bio + NFC access",
    description:
      "React + Firebase; NFC-driven access to a social links tree.",
    year: 2022,
    skills: ["React", "Firebase", "NFC"],
  },

];



export const skillColor: Record<string, string> = {
  // Core
  Laravel: "bg-red-900/30 text-red-200 border-red-800",
  React: "bg-sky-900/30 text-sky-200 border-sky-800",
  "React Native": "bg-indigo-900/30 text-indigo-200 border-indigo-800",
  "Next.js": "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  Inertia: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  "Vue.js": "bg-emerald-900/30 text-emerald-200 border-emerald-800",
  Go: "bg-cyan-900/30 text-cyan-200 border-cyan-800",
  "Node.js": "bg-emerald-900/30 text-emerald-200 border-emerald-800",

  // Data + infra
  MySQL: "bg-amber-900/30 text-amber-200 border-amber-800",
  PostgreSQL: "bg-sky-900/30 text-sky-200 border-sky-800",
  MongoDB: "bg-green-900/30 text-green-200 border-green-800",
  SQLite: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  Linux: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  Docker: "bg-blue-900/30 text-blue-200 border-blue-800",
  Queues: "bg-violet-900/30 text-violet-200 border-violet-800",
  "Background Jobs": "bg-violet-900/30 text-violet-200 border-violet-800",
  Cron: "bg-neutral-900/60 text-neutral-300 border-neutral-700",

  // No-code & site
  Webflow: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  Wized: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  Xano: "bg-orange-900/30 text-orange-200 border-orange-800",
  Memberstack: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  SEO: "bg-neutral-900/60 text-neutral-300 border-neutral-700",

  // APIs / Platforms
  "YouTube API": "bg-rose-900/30 text-rose-200 border-rose-800",
  "Facebook API": "bg-blue-900/30 text-blue-200 border-blue-800",
  "Telegram API": "bg-cyan-900/30 text-cyan-200 border-cyan-800",
  OpenAI: "bg-fuchsia-900/30 text-fuchsia-200 border-fuchsia-800",
  Stripe: "bg-purple-900/30 text-purple-200 border-purple-800",
  Firebase: "bg-amber-900/30 text-amber-200 border-amber-800",
  NFC: "bg-green-900/30 text-green-200 border-green-800",

  // Misc
  "System Design": "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  Scraping: "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  "E-commerce": "bg-neutral-900/60 text-neutral-300 border-neutral-700",
  "shadcn/ui": "bg-neutral-900/60 text-neutral-300 border-neutral-700",
}
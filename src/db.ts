import type { Project } from "./types";

// --- Data ---
export const ABOUT_ME = {
  description: `Full-stack developer: Laravel, React / React Native, Go, and system design.\nI build marketplaces, social media platforms, real-time apps, and robust APIs.`,
  pdf_portfolio: '/portfolio.pdf?show=true',
  skills: [
    "Laravel",
    "React",
    "React Native",
    "Go",
    "System Design",
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
    email: 'jervi@jervi.dev',
    phoneNumber: '+213558054300',
    github: 'https://github.com/Jervi-sir',
    linkedIn: 'https://www.linkedin.com/in/gacem-bekhira/',
    instagram: 'https://www.instagram.com/gacem_humen/',
    tiktok: 'https://www.tiktok.com/@what_jervi_thinks_of_dz'
  }
}

import projectsData from "./projects.json";

export const PROJECTS: Project[] = projectsData as Project[];



export const skillColor: Record<string, string> = {
  // Core — silver/white metallic
  Laravel: "bg-neutral-800/50 text-neutral-200 border-neutral-600/40",
  React: "bg-neutral-800/50 text-neutral-200 border-neutral-600/40",
  "React Native": "bg-neutral-800/50 text-neutral-200 border-neutral-600/40",
  "Next.js": "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Inertia: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  "Vue.js": "bg-neutral-800/50 text-neutral-200 border-neutral-600/40",
  Go: "bg-neutral-800/50 text-neutral-200 border-neutral-600/40",
  "Node.js": "bg-neutral-800/50 text-neutral-200 border-neutral-600/40",

  // Data + infra — warm bronze accent
  MySQL: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  PostgreSQL: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  MongoDB: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  SQLite: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Linux: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Docker: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Queues: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  "Background Jobs": "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Cron: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",

  // No-code & site
  Webflow: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Wized: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Xano: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  Memberstack: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  SEO: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",

  // APIs / Platforms — subtle bronze
  "YouTube API": "bg-stone-800/30 text-stone-300 border-stone-600/30",
  "Facebook API": "bg-stone-800/30 text-stone-300 border-stone-600/30",
  "Telegram API": "bg-stone-800/30 text-stone-300 border-stone-600/30",
  OpenAI: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  Stripe: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  Firebase: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  NFC: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  ElevenLabs: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  Whisper: "bg-stone-800/30 text-stone-300 border-stone-600/30",
  Simli: "bg-stone-800/30 text-stone-300 border-stone-600/30",

  // Misc
  "System Design": "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  Scraping: "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  "E-commerce": "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
  "shadcn/ui": "bg-neutral-800/50 text-neutral-300 border-neutral-700/50",
}
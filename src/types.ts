// src/types.ts
export const ALL_SKILLS = [
  // Core stacks
  "Laravel", "React", "React Native", "Next.js", "Inertia", "Vue.js", "Go", "Node.js", "Tailwind", "Python",
  "Nextjs", "JavaScript", "Bootstrap", 
  // Data + infra
  "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Supabase", "Linux", "Docker", "Queues", "Background Jobs", "Cron",  "Heroku",
  // No-code & site
  "Webflow", "Wized", "Xano", "Memberstack", "SEO",
  // APIs / Platforms
  "YouTube API", "Facebook API", "Telegram API", "OpenAI", "Stripe", "Firebase", "NFC",
  "Logistics", "API", "AI",
  // Misc
  "System Design", "Scraping", "E-commerce", "shadcn/ui",
  // Extra (add any you’ve used in your projects)
  "Websocket", "Soketi", "Redis", "Legacy Systems", "Gamification", "Scheduling", "Tauri",
] as const

export type Skill = typeof ALL_SKILLS[number]

export type Project = {
  id: string
  title: string
  subtitle?: string
  description: string
  year: string | number
  link?: string
  repo?: string
  skills: Skill[]
}

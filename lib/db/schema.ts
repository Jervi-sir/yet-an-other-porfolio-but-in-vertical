import { pgTable, text, integer, timestamp, jsonb, doublePrecision } from "drizzle-orm/pg-core";

export const project = pgTable("Project", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  year: text("year").notNull(),
  link: text("link"),
  repo: text("repo"),
  details: text("details"),
  keyPoints: text("keyPoints").array().notNull().default([]),
  skills: text("skills").array().notNull().default([]),
  orderIndex: doublePrecision("order_index").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const about = pgTable("About", {
  id: text("id").primaryKey().default("about-me"),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  pdf_portfolio: text("pdf_portfolio"),
  skills: text("skills").array().notNull().default([]),
  stats: jsonb("stats"),
  socials: jsonb("socials"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const visitors = pgTable("Visitors", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  ip: text("ip").notNull(),
  userAgent: text("user_agent"),
  path: text("path"),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

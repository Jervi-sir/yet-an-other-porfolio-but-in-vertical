CREATE TABLE "About" (
	"id" text PRIMARY KEY DEFAULT 'about-me' NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"description" text NOT NULL,
	"email" text,
	"phone" text,
	"location" text,
	"pdf_portfolio" text,
	"skills" text[] DEFAULT '{}' NOT NULL,
	"stats" jsonb,
	"socials" jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Project" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"description" text NOT NULL,
	"year" text NOT NULL,
	"link" text,
	"repo" text,
	"details" text,
	"keyPoints" text[] DEFAULT '{}' NOT NULL,
	"skills" text[] DEFAULT '{}' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

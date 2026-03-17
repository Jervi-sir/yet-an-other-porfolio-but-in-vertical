CREATE TABLE "Visitors" (
	"id" text PRIMARY KEY NOT NULL,
	"ip" text NOT NULL,
	"user_agent" text,
	"path" text,
	"visited_at" timestamp DEFAULT now() NOT NULL
);

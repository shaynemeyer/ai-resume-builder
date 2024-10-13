import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { resumes } from "./resumes";
import { relations } from "drizzle-orm";

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id")
    .references(() => resumes.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title"),
  company: text("company"),
  address: text("address"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const experienceRelations = relations(experience, ({ one }) => ({
  resume: one(resumes, {
    fields: [experience.resumeId],
    references: [resumes.id],
  }),
}));

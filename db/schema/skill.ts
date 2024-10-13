import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { resumes } from "./resumes";
import { relations } from "drizzle-orm";

export const skill = pgTable("skill", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id")
    .references(() => resumes.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name"),
  level: text("level"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skillRelations = relations(skill, ({ one }) => ({
  resume: one(resumes, {
    fields: [skill.resumeId],
    references: [resumes.id],
  }),
}));

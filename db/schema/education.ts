import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { resumes } from "./resumes";
import { relations } from "drizzle-orm";

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id")
    .references(() => resumes.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name"),
  address: text("address"),
  qualification: text("qualification"),
  year: text("year"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const eductionRelations = relations(education, ({ one }) => ({
  resume: one(resumes, {
    fields: [education.resumeId],
    references: [resumes.id],
  }),
}));

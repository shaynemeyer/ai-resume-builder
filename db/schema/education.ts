import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { resume } from "./resume";

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id").references(() => resume.id),
  name: text("name"),
  address: text("address"),
  qualification: text("qualification"),
  year: text("year"),
  createdAt: timestamp("created_at").defaultNow(),
});

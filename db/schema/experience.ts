import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id"),
  title: text("title"),
  company: text("company"),
  address: text("address"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

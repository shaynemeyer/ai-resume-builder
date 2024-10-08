import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
  id: serial().primaryKey(),
  title: text("title"),
  company: text("company"),
  address: text("address"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

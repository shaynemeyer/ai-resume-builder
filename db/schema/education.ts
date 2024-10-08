import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const education = pgTable("education", {
  id: serial().primaryKey(),
  name: text("name"),
  address: text("address"),
  qualification: text("qualification"),
  year: text("year"),
  createdAt: timestamp("created_at").defaultNow(),
});

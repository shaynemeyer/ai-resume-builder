import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const skill = pgTable("skill", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id"),
  name: text("name"),
  level: text("level"),
  createdAt: timestamp("created_at").defaultNow(),
});

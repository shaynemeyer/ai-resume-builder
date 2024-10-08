import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const skill = pgTable("skill", {
  id: serial().primaryKey(),
  name: text("name"),
  level: text("level"),
  createdAt: timestamp("created_at").defaultNow(),
});

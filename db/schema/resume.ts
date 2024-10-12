import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { experience } from "./experience";
import { education } from "./education";
import { skill } from "./skill";

export const resume = pgTable("resume", {
  id: serial().primaryKey(),
  userEmail: text("user_email"),
  email: text("email"),
  title: text("title"),
  name: text("name"),
  job: text("job"),
  address: text("address"),
  phone: text("phone"),
  themeColor: text("theme_color"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const experienceRelations = relations(resume, ({ many }) => ({
  experience: many(experience),
}));

export const educationRelations = relations(resume, ({ many }) => ({
  education: many(education),
}));

export const skillRelations = relations(resume, ({ many }) => ({
  skill: many(skill),
}));

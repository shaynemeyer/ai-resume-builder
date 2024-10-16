"use server";
import { sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { experience } from "@/db/schema/experience";
import { Experience } from "@/types/experience";
import { currentUser } from "@clerk/nextjs/server";

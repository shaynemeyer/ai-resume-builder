"use server";
import { sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { experience } from "@/db/schema/experience";
import { Experience } from "@/types/experience";
import { checkOwnership } from "./resume";

export const getExperienceFromDb = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(experience)
      .where(sql`id=${id}`);

    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const createExperience = async (newExperience: Experience) => {
  console.log(`createExperience => ${JSON.stringify(newExperience)}`);

  try {
    // check ownership
    await checkOwnership(parseInt(newExperience.resumeId as unknown as string));

    const experienceResult = await db
      .insert(experience)
      .values({
        title: newExperience?.title,
        company: newExperience?.company,
        address: newExperience?.address,
        startDate: newExperience?.startDate,
        endDate: newExperience?.endDate,
        summary: newExperience?.summary,
        resumeId: parseInt(newExperience?.resumeId as unknown as string),
        id: undefined, // remove id to let db automatically generate id
      })
      .returning();

    return experienceResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const getExperienceByResumeId = async (resumeId: number) => {
  try {
    // check ownership
    await checkOwnership(resumeId);

    const result = await db
      .select()
      .from(experience)
      .where(sql`resume_id=${resumeId}`);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

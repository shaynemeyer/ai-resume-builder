"use server";
import { Education } from "@/types/education";
import { checkOwnership } from "./resume";
import { education } from "@/db/schema/education";
import { db } from "@/db/drizzle";
import { sql } from "drizzle-orm";

export const updateEducation = async (updateEducation: Education) => {
  try {
    // check ownership
    await checkOwnership(updateEducation.resumeId as number);

    const result = await db
      .update(education)
      .set({
        resumeId: parseInt(updateEducation?.resumeId as unknown as string),
        name: updateEducation?.name,
        address: updateEducation?.address,
        qualification: updateEducation?.qualification,
        year: updateEducation?.year,
      })
      .where(sql`id=${updateEducation?.id}`)
      .returning();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const createEducation = async (newEducation: Education) => {
  console.log(`createEducation => ${JSON.stringify(newEducation)}`);

  try {
    // check ownership
    await checkOwnership(parseInt(newEducation.resumeId as unknown as string));

    const educationResult = await db
      .insert(education)
      .values({
        resumeId: parseInt(newEducation?.resumeId as unknown as string),
        name: newEducation?.name,
        address: newEducation?.address,
        qualification: newEducation?.qualification,
        year: newEducation?.year,
        id: undefined, // remove id to let db automatically generate id
      })
      .returning();

    return educationResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const getEducationByResumeId = async (resumeId: number) => {
  try {
    // check ownership
    await checkOwnership(resumeId);

    const result = await db
      .select()
      .from(education)
      .where(sql`resume_id=${resumeId}`);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const getEducationFromDb = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(education)
      .where(sql`id=${id}`);

    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const deleteEducationAction = async (educationId: number) => {
  console.log(`deleting education ${educationId}`);
  try {
    await db.delete(education).where(sql`id=${educationId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

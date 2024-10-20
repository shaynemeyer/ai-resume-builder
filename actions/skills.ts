"use server";

import { sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { skill } from "@/db/schema/skill";
import { Skill } from "@/types/skill";
import { checkOwnership } from "./resume";

export const updateSkill = async (updateSkill: Skill) => {
  try {
    // check ownership
    await checkOwnership(updateSkill.resumeId as number);

    const result = await db
      .update(skill)
      .set({
        resumeId: parseInt(updateSkill?.resumeId as unknown as string),
        name: updateSkill?.name,
        level: updateSkill?.level,
      })
      .where(sql`id=${updateSkill?.id}`)
      .returning();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const createSkill = async (newSkill: Skill) => {
  console.log(`createSkill => ${JSON.stringify(newSkill)}`);

  try {
    // check ownership
    await checkOwnership(parseInt(newSkill.resumeId as unknown as string));

    const skillResult = await db
      .insert(skill)
      .values({
        resumeId: parseInt(newSkill?.resumeId as unknown as string),
        name: newSkill?.name,
        level: newSkill?.level,
        id: undefined, // remove id to let db automatically generate id
      })
      .returning();

    return skillResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const getSkillByResumeId = async (resumeId: number) => {
  try {
    // check ownership
    await checkOwnership(resumeId);

    const result = await db
      .select()
      .from(skill)
      .where(sql`resume_id=${resumeId}`);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const getSkillFromDb = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(skill)
      .where(sql`id=${id}`);

    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const deleteSkillAction = async (skillId: number) => {
  console.log(`deleting skill ${skillId}`);
  try {
    await db.delete(skill).where(sql`id=${skillId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

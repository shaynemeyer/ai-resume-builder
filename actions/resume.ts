"use server";

import { db } from "@/db/drizzle";
import { resume } from "@/db/schema/resume";
import { Resume } from "@/types/resume";
import { currentUser } from "@clerk/nextjs/server";

export const saveResumeToDb = async (data: Resume) => {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const resumeResult = await db
      .insert(resume)
      .values({
        ...data,
        userEmail,
        id: undefined, // remove id to let db automatically generate id
      })
      .returning();
    return resumeResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.log(error);
  }
};

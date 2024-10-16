"use server";
import { sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { resumes } from "@/db/schema/resumes";
import { Resume } from "@/types/resume";
import { currentUser } from "@clerk/nextjs/server";
import {
  personalInformationSchema,
  validateWithZodSchema,
} from "@/utils/schemas";
import { redirect, RedirectType } from "next/navigation";

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

const currentUserEmail = async () => {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  return userEmail;
};

const checkOwnership = async (resumeId: number) => {
  try {
    const userEmail = await currentUserEmail();
    if (!userEmail) {
      throw new Error("User not found");
    }

    // find the resume by id
    const result = await db
      .selectDistinct()
      .from(resumes)
      .where(sql`id=${resumeId} and user_email=${userEmail}`);

    if (!result) {
      throw new Error("Resume not found");
    }

    // check ownership
    if (result[0].userEmail !== userEmail) {
      throw new Error("Unauthorized");
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const createResumeAction = async (
  prevState: unknown,
  formData: FormData
) => {
  let resumeId = 0;
  try {
    const userEmail = await currentUserEmail();
    if (!userEmail) {
      throw new Error("Please login to create a resume");
    }

    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(
      personalInformationSchema,
      rawData
    );

    const resumeResult = await db
      .insert(resumes)
      .values({
        ...validatedFields,
        userEmail,
        id: undefined, // remove id to let db automatically generate id
      })
      .returning();
    resumeId = resumeResult[0].id!;
  } catch (error) {
    return renderError(error);
  }

  if (resumeId > 0) {
    redirect(`/dashboard/resume/edit/${resumeId}`);
  }

  redirect("/error");
};

export const saveResumeToDb = async (data: Resume) => {
  try {
    const userEmail = await currentUserEmail();

    const resumeResult = await db
      .insert(resumes)
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

    console.error(error);
  }
};

export const getUserResumesFromDb = async () => {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    if (userEmail) {
      const result = await db
        .select()
        .from(resumes)
        .where(sql`user_email=${userEmail}`);

      return result;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const getResumeFromDb = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(resumes)
      .where(sql`id=${id}`);

    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

export const updateResumeFromDb = async (data: Resume) => {
  try {
    // check ownership
    await checkOwnership(parseInt(data?.id as unknown as string));

    const result = await db
      .update(resumes)
      .set({
        name: data.name,
        job: data.job,
        address: data.address,
        phone: data.phone,
        email: data.email,
        themeColor: data.themeColor,
      })
      .where(sql`id=${data?.id}`)
      .returning();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    console.error(error);
  }
};

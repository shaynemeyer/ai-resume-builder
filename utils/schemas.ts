import * as z from "zod";
import { ZodSchema } from "zod";

export const personalInformationSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(50, {
      message: "Name must not exceed 50 characters",
    }),
  job: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(", "));
  }
  return result.data;
}

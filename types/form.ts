import { FormEvent } from "react";

export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

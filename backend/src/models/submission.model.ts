import { FormSchema } from "../schema/formSchema.js";

export interface Submission {
  id: string;
  createdAt: string;
  data: Record<string, any>;
}

// simple in-memory store
export const submissions: Submission[] = [];

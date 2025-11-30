import { submissions, Submission } from "../models/submission.model.js";
import { v4 as uuid } from "uuid";

export const createSubmission = (data: Record<string, any>): Submission => {
  const newSubmission: Submission = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    data,
  };
  submissions.push(newSubmission);
  return newSubmission;
};

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export const getSubmissions = (
  page: number,
  limit: number,
  sortOrder: "asc" | "desc"
): PaginatedResult<Submission> => {
  const sorted = [...submissions].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.createdAt.localeCompare(b.createdAt);
    }
    return b.createdAt.localeCompare(a.createdAt);
  });

  const total = sorted.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const items = sorted.slice(start, start + limit);

  return { items, total, totalPages, page, limit };
};

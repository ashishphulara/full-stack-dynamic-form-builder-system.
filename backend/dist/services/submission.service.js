import { submissions } from "../models/submission.model";
import { v4 as uuid } from "uuid";
export const createSubmission = (data) => {
    const newSubmission = {
        id: uuid(),
        createdAt: new Date().toISOString(),
        data,
    };
    submissions.push(newSubmission);
    return newSubmission;
};
export const getSubmissions = (page, limit, sortOrder) => {
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

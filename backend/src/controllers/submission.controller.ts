import { Request, Response } from "express";
import { employeeOnboardingFormSchema } from "../schema/formSchema";
import { createSubmission, getSubmissions } from "../services/submission.service";
import { validateSubmission } from "../utils/validationHelpers";

export const postSubmission = (req: Request, res: Response) => {
  const data = req.body;

  const errors = validateSubmission(employeeOnboardingFormSchema, data);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  const submission = createSubmission(data);

  return res.status(201).json({
    success: true,
    id: submission.id,
    createdAt: submission.createdAt,
  });
};

export const getSubmissionsHandler = (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = (req.query.sortBy as string) || "createdAt";
  const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

  if (sortBy !== "createdAt") {
    return res.status(400).json({
      success: false,
      message: "Only sorting by createdAt is supported",
    });
  }

  const result = getSubmissions(page, limit, sortOrder);

  return res.status(200).json({
    success: true,
    ...result,
  });
};

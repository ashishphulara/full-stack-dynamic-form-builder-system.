import { Request, Response } from "express";
import { employeeOnboardingFormSchema } from "../schema/formSchema";

export const getFormSchema = (_req: Request, res: Response) => {
  res.status(200).json(employeeOnboardingFormSchema);
};

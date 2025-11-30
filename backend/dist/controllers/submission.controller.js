import { employeeOnboardingFormSchema } from "../schema/formSchema.js";
import { createSubmission, getSubmissions } from "../services/submission.service.js";
import { validateSubmission } from "../utils/validationHelpers.js";
export const postSubmission = (req, res) => {
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
export const getSubmissionsHandler = (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
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

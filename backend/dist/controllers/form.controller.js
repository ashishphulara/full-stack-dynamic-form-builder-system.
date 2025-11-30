import { employeeOnboardingFormSchema } from "../schema/formSchema.js";
export const getFormSchema = (_req, res) => {
    res.status(200).json(employeeOnboardingFormSchema);
};

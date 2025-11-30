import { Router } from "express";
import { getFormSchema } from "../controllers/form.controller.js";

const router = Router();

router.get("/form-schema", getFormSchema);

export default router;

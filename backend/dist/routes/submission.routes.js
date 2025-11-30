import { Router } from "express";
import {
  getSubmissionsHandler,
  postSubmission,
} from "../controllers/submission.controller.js";
const router = Router();
router.post("/submissions", postSubmission);
router.get("/submissions", getSubmissionsHandler);
export default router;

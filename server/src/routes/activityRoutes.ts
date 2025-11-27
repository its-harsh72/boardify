import { Router } from "express";
import { getActivityByTask } from "../controllers/activityController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/task/:taskId", protect, getActivityByTask);

export default router;

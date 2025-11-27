import { Router } from "express";
import {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, createTask);
router.get("/board/:boardId", protect, getTasksByBoard);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;

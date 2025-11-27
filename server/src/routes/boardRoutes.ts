import { Router } from "express";
import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:id", protect, getBoardById);
router.put("/:id", protect, updateBoard);
router.delete("/:id", protect, deleteBoard);

export default router;

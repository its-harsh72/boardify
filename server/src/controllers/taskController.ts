import { Request, Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middlewares/authMiddleware";
import { logActivity } from "../utils/activityLogger";

// CREATE TASK
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, boardId } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      boardId,
      status: "todo",
    });

    res.status(201).json(task);
    await logActivity(task._id.toString(), req.userId!, "created task");
    
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// GET ALL TASKS FOR BOARD
export const getTasksByBoard = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// UPDATE TASK (STATUS, DETAILS, ASSIGNED USER)
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(task);
    await logActivity(req.params.id, req.userId!, "updated task");
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// DELETE TASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
    await logActivity(req.params.id, req.userId!, "deleted task");
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

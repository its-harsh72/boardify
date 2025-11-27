import { Request, Response } from "express";
import Activity from "../models/Activity";

export const getActivityByTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const logs = await Activity.find({ taskId }).sort({ createdAt: -1 });

    return res.status(200).json(logs);
  } catch (error) {
    console.error("Activity fetch error:", error);
    return res.status(500).json({ message: "Error fetching activity" });
  }
};

import Activity from "../models/Activity";

export const getActivityByTask = async (req, res) => {
  try {
    const logs = await Activity.find({ taskId: req.params.taskId })
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    console.error("Activity fetch error:", error);
    res.status(500).json({ message: "Error fetching activity" });
  }
};

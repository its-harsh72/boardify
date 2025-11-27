import Activity from "../models/Activity";

export const logActivity = async (
  taskId: string,
  userId: string,
  action: string
) => {
  try {
    await Activity.create({ taskId, userId, action });
  } catch (error) {
    console.log("Activity log error:", error);
  }
};

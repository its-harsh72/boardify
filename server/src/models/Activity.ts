import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  taskId: string;
  userId: string;
  action: string;
}

const activitySchema: Schema<IActivity> = new Schema(
  {
    taskId: { type: String, required: true },
    userId: { type: String, required: true },
    action: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>("Activity", activitySchema);

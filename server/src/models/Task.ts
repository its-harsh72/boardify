import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: string;
  priority: string;
  boardId: string;
  assignedTo?: string;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    boardId: { type: String, required: true },
    assignedTo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);

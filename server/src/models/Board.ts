import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  title: string;
  description?: string;
  owner: string;
  members: string[];
  columns: string[];
}

const boardSchema: Schema<IBoard> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: String, required: true },
    members: { type: [String], default: [] },
    columns: {
      type: [String],
      default: ["todo", "in-progress", "done"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBoard>("Board", boardSchema);

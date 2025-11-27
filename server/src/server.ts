import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";
import taskRoutes from "./routes/taskRoutes";
import activityRoutes from "./routes/activityRoutes";
dotenv.config();
connectDB();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL as string,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activity", activityRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Boardify Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

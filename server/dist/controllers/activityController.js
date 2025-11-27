"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityByTask = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const getActivityByTask = async (req, res) => {
    try {
        const logs = await Activity_1.default.find({ taskId: req.params.taskId })
            .sort({ createdAt: -1 });
        res.json(logs);
    }
    catch (error) {
        console.error("Activity fetch error:", error);
        res.status(500).json({ message: "Error fetching activity" });
    }
};
exports.getActivityByTask = getActivityByTask;

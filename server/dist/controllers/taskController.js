"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasksByBoard = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const activityLogger_1 = require("../utils/activityLogger");
// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description, priority, boardId } = req.body;
        const task = await Task_1.default.create({
            title,
            description,
            priority,
            boardId,
            status: "todo",
        });
        res.status(201).json(task);
        await (0, activityLogger_1.logActivity)(task._id.toString(), req.userId, "created task");
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};
exports.createTask = createTask;
// GET ALL TASKS FOR BOARD
const getTasksByBoard = async (req, res) => {
    try {
        const tasks = await Task_1.default.find({ boardId: req.params.boardId });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};
exports.getTasksByBoard = getTasksByBoard;
// UPDATE TASK (STATUS, DETAILS, ASSIGNED USER)
const updateTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
        await (0, activityLogger_1.logActivity)(req.params.id, req.userId, "updated task");
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};
exports.updateTask = updateTask;
// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        await Task_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted" });
        await (0, activityLogger_1.logActivity)(req.params.id, req.userId, "deleted task");
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};
exports.deleteTask = deleteTask;

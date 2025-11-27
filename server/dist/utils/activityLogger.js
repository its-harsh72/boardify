"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const logActivity = async (taskId, userId, action) => {
    try {
        await Activity_1.default.create({ taskId, userId, action });
    }
    catch (error) {
        console.log("Activity log error:", error);
    }
};
exports.logActivity = logActivity;

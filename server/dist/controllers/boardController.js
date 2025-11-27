"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.getBoardById = exports.getBoards = exports.createBoard = void 0;
const Board_1 = __importDefault(require("../models/Board"));
const createBoard = async (req, res) => {
    try {
        const { title, description } = req.body;
        const board = await Board_1.default.create({
            title,
            description,
            owner: req.userId,
            members: [req.userId],
        });
        res.status(201).json(board);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating board" });
    }
};
exports.createBoard = createBoard;
const getBoards = async (req, res) => {
    try {
        const boards = await Board_1.default.find({
            members: req.userId,
        });
        res.status(200).json(boards);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching boards" });
    }
};
exports.getBoards = getBoards;
const getBoardById = async (req, res) => {
    try {
        const board = await Board_1.default.findById(req.params.id);
        if (!board)
            return res.status(404).json({ message: "Board not found" });
        res.status(200).json(board);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching board" });
    }
};
exports.getBoardById = getBoardById;
const updateBoard = async (req, res) => {
    try {
        const board = await Board_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(board);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating board" });
    }
};
exports.updateBoard = updateBoard;
const deleteBoard = async (req, res) => {
    try {
        await Board_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Board deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting board" });
    }
};
exports.deleteBoard = deleteBoard;

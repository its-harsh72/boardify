import { Request, Response } from "express";
import Board from "../models/Board";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const board = await Board.create({
      title,
      description,
      owner: req.userId,
      members: [req.userId],
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error creating board" });
  }
};

export const getBoards = async (req: AuthRequest, res: Response) => {
  try {
    const boards = await Board.find({
      members: req.userId,
    });

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boards" });
  }
};

export const getBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: "Board not found" });

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error fetching board" });
  }
};

export const updateBoard = async (req: AuthRequest, res: Response) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error updating board" });
  }
};

export const deleteBoard = async (req: AuthRequest, res: Response) => {
  try {
    await Board.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting board" });
  }
};

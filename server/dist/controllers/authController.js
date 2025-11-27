"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        const userExists = await User_1.default.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hashed,
        });
        const token = (0, jwt_1.generateToken)(user._id.toString());
        res
            .cookie("token", token, { httpOnly: true })
            .status(201)
            .json({ message: "User registered", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email & password required" });
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = (0, jwt_1.generateToken)(user._id.toString());
        res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json({ message: "Login success", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;

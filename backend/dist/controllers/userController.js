"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const userModel_1 = require("../models/userModel");
/**
 *
 * @param req
 * @param res
 * @returns
 */
const registerUser = async (req, res) => {
    try {
        const { name, username, password, type } = req.body;
        // Check if the username already exists
        const existingUser = await userModel_1.User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        //Generate Unique ID
        const id = (0, uuid_1.v4)();
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user
        const newUser = new userModel_1.User({
            id,
            name,
            username,
            password: hashedPassword,
            type,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.registerUser = registerUser;
/**
 *
 * @param req
 * @param res
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllUsers = getAllUsers;

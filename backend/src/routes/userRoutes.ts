import express from "express";
import { registerUser, getAllUsers } from "../controllers/userController";

export const userRouter = express.Router();

// Endpoint for user registration
userRouter.post("/register", registerUser);
userRouter.get("/", getAllUsers);

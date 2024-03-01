import express from "express";

import { login } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/login", login);

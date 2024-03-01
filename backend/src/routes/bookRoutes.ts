import express from "express";
import multer from "multer";

import { uploadFile } from "../controllers/bookController";

export const bookRouter = express.Router();

const upload = multer({ dest: "cache/" });

bookRouter.post("/upload", upload.single("file"), uploadFile);

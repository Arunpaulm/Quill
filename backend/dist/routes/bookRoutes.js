"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const bookController_1 = require("../controllers/bookController");
exports.bookRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "cache/" });
exports.bookRouter.post("/upload", upload.single("file"), bookController_1.uploadFile);

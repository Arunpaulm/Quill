"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    try {
        await mongoose_1.default.connect(`mongodb+srv://${username}:${password}@matrix.yrnd5ce.mongodb.net/${database}`, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;

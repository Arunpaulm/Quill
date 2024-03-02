"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// Define the schema for the UploadedFile collection
const BookSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    author: { type: String },
});
// Define and export the UploadedFile model
exports.Book = (0, mongoose_1.model)("Book", BookSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Define the schema for the User collection
const UserSchema = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Author", "Consumer"], required: true },
});
// Define and export the User model
exports.User = (0, mongoose_1.model)("User", UserSchema);

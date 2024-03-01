"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *
 * @param req
 * @param res
 * @param next
 */
const login = async (req, res, next) => {
    passport_1.default.authenticate("token", async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: "Invalid User" });
            }
            // If user is found, verify the password
            const passwordMatch = await bcryptjs_1.default.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ message: "Incorrect username or password" });
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            // Respond with a success message and token
            const data = user.toObject();
            delete data.password;
            res.status(200).json({ message: "Login successful", token, data });
        }
        catch (error) {
            console.error("Error during login:", error);
            return next(error);
        }
    })(req, res, next);
};
exports.login = login;

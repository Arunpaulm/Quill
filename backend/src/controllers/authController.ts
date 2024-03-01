import { Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("token", async (err: any, user: any, info: any) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid User" });
      }

      // If user is found, verify the password
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Respond with a success message and token
      const data = user.toObject();
      delete data.password;
      res.status(200).json({ message: "Login successful", token, data });
    } catch (error) {
      console.error("Error during login:", error);
      return next(error);
    }
  })(req, res, next);
};

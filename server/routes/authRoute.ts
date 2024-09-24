import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin, IAdmin } from "../models/admin";
import jwt from "jsonwebtoken";
const router = express.Router();
const asyncHandler = require("express-async-handler");

dotenv.config();
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}
const generateToken = (admin: IAdmin) => {
  const payload = {
    id: admin._id,
    username: admin.username,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

// Admin authentication
router.post(
  "/api/admin/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin)
        return res.status(401).json({ message: "Incorrect Admin Username" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(401).json({ message: "Incorrect Admin Password" });

      const token = generateToken(admin);

      res.json({ token, admin: { id: admin._id, username: admin.username } });
    } catch (error) {
      console.error("Login error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }),
);

router.get(
  "/api/admin/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json(null);
      });
    } catch (err) {
      console.log(err);
    }
  }),
);

module.exports = router;

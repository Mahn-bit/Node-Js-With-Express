import { Request, response, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userSchema";

const secretKey = crypto.randomBytes(32).toString("hex");

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res
        .status(400)
        .json({ status: "Failed", message: "Username already exist" });
      process.exit(1);
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res
        .status(400)
        .json({ status: "Failed", message: "Email already exist" });
      process.exit(1);
    }
    await User.create(req.body);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: "Failed", message: error.message });
      process.exit(1);
    }
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ status: "Failed", message: "Invalid credentials" });
      process.exit(1);
    }
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      res
        .status(401)
        .json({ status: "Failed", message: "Invalid credentials" });
      process.exit(1);
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }
};

export { createUser, login };





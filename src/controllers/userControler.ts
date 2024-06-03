import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(`JWT_SECRET not define. Please set the environment variable`);
}

const createAccount = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    const existUser = await User.findOne({ email, username });
    if (existUser) {
      return res
        .status(400)
        .json({ status: "Failed", message: "User already exist." });
    }
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(500).json({ status: "Failed", message: "Server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

export { createAccount, login };

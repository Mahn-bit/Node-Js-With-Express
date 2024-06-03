import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET;

console.log(`JWT_SECRET: ${JWT_SECRET}`);
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined. Please set an environment variable");
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(404)
      .json({ status: "Failed", message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Token is invalid" });
  }
};

export default authMiddleware;

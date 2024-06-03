import express from "express";
import { createAccount, login } from "../controllers/userControler";

const userRouter = express.Router();

userRouter.post("/createAccount", createAccount);
userRouter.post("/login", login);

export default userRouter;

import express from "express";
import { createUser, login } from "../controllers/userControler";

const router = express.Router();

router.route("/").post(createUser).all(login);



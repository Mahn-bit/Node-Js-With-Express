import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getAllMovies)
  .post(authMiddleware, createMovie);

router
  .route("/:id")
  .get(authMiddleware, getMovie)
  .patch(authMiddleware, updateMovie)
  .delete(authMiddleware, deleteMovie);

export default router;

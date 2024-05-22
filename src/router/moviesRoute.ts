import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const router = express.Router();

router.route("/").get(getAllMovies).post(createMovie);

router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default router;

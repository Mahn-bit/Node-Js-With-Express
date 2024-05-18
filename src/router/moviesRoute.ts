import express from "express";

import {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  createMovie,
} from "../controler/movieControler";

const router = express.Router();

router.route("/").get(getAllMovies).post(createMovie);

router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default router;

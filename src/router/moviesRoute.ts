import express from "express";

import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getStatus,
} from "../controler/movieControler";

const movieRouter = express.Router();

movieRouter.get("/status", getStatus);

movieRouter.route("/").get(getAllMovies).post(createMovie);

movieRouter.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default movieRouter;

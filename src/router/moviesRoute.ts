import express from "express";

import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getStatus,
  checkId,
} from "../controler/movieControler";

const movieRouter = express.Router();

movieRouter.param("id", checkId);

movieRouter.get("/status", getStatus);

movieRouter.route("/").get(getAllMovies).post(createMovie);

movieRouter.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default movieRouter;

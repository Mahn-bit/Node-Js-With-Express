import { Request, Response } from "express";

import { readFileSync, writeFile } from "fs";
import dotenv from "dotenv";

dotenv.config();



const moviesFilePath = process.env.MOVIES_FILE_PATH;

if (!moviesFilePath) {
  console.error(
    `Movies file path is not provided in the environment variable.`
  );
  process.exit(1);
}

const movies = JSON.parse(readFileSync(moviesFilePath, "utf-8"));

const getStatus = (req: Request, res: Response) => {
  res.status(200).json({ status: `OK` });
};

const getAllMovies = (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredMovies = movies.slice(startIndex, endIndex);

  res.status(200).json({
    status: "Successful",
    count: movies.length,
    requestedAt: req.requestedAt,
    data: filteredMovies,
  });
};

const getMovie = (req: Request, res: Response) => {
  const movieId: number = Number(req.params.id);
  if (isNaN(movieId)) {
    res.status(400).json({ status: "Fail", message: `Invaid movie id.` });
  }
  const movieIndex = movies.findIndex(
    (movie: { id: number }) => movie.id === movieId
  );

  if (movieIndex === -1) {
    res.status(404).json({
      status: "Failed",
      message: `Movie with id: ${movieId} not found.`,
    });
  }

  const movie = movies[movieIndex];

  res.status(200).json({ status: `Succesful`, data: movie });
};

const createMovie = (req: Request, res: Response) => {
  const newId: number = movies[movies.length - 1].id + 1;

  const newMovie = {
    id: newId,
    ...req.body,
  };

  const requireProps = ["name", "release_year", "duration", "genre"];

  const missingProps = requireProps.filter((prop) => !(prop in newMovie));
  if (missingProps.length > 0) {
    res.status(400).json({
      status: "Failed",
      message: `Missing required properties: ${missingProps.join(", ")}`,
    });
    return;
  }

  movies.push(newMovie);

  writeFile("data/movies.json", JSON.stringify(movies), (error) => {
    if (error) {
      res
        .status(500)
        .json({ status: "Failed", message: "Internal server error/" });
      return;
    }

    res.status(200).json({
      status: "Successful",
      data: newMovie,
    });
  });
};

const updateMovie = (req: Request, res: Response) => {
  const movieId: number = Number(req.params.id);
  if (isNaN(movieId)) {
    res.status(400).json({ status: "Failed", message: `Invalid movie id` });
  }
  const movieIndex = movies.findIndex(
    (movie: { id: number }) => movie.id === movieId
  );

  if (movieIndex === -1) {
    res.status(404).json({
      status: `Failed`,
      message: `Movies with ID: ${movieId} not found`,
    });
  }
  const updatedMovie = {
    ...movies[movieIndex],
    ...req.body,
  };

  movies[movieIndex] = updatedMovie;

  writeFile("data/movies.json", JSON.stringify(movies), (error) => {
    if (error) {
      res
        .status(500)
        .json({ status: "Failed", message: `Internal server error.` });
    }

    res.status(200).json({ status: "Successful", data: updatedMovie });
  });
};

const deleteMovie = (req: Request, res: Response) => {
  const movieId: number = Number(req.params.id);
  const movieIndex = movies.findIndex(
    (movie: { id: number }) => movie.id === movieId
  );

  if (movieIndex === -1) {
    res.status(400).json({ status: "Failed", message: `Invalid movie ID.` });
    return;
  }
  const filteredMovies = movies.filter(
    (movie: { id: number }) => movie.id !== movieId
  );

  movies.splice(0, movies.length, ...filteredMovies);

  writeFile("data/movies.json", JSON.stringify(movies), (error) => {
    if (error) {
      res
        .status(500)
        .json({ status: "Failed", message: "Internal server error" });
      return;
    }

    res
      .status(200)
      .json({ status: "Success;", message: "Resource successfully deleted" });
  });
};

export {
  getStatus,
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};

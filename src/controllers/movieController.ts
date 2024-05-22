import { NextFunction, Request, Response } from "express";
import Movie from "../models/movieSchema";

const createMovie = async (req: Request, res: Response) => {
  try {
    const newMovie = await Movie.create(req.body);
    console.log(newMovie);
    res.status(201).json({ status: "Successful", data: { newMovie } });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: `${error}` });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ status: "Successful", data: { movies } });
  } catch (error) {
    console.error(`Error retrieving moveis ${error}`);
  }
};

const getMovie = async (req: Request, res: Response) => {
  try {
    const getMovie = await Movie.findById(req.params.id);
    if (!getMovie) {
      res.status(404).json({ status: "Failed", message: "Movies not found." });
      process.exit(1);
    }
    res.status(200).json({ status: "Successful", data: getMovie });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ status: "Fail", message: error.message });
      process.exit(1);
    } else {
      res
        .status(404)
        .json({ status: "failed", message: "Unknown error orrured." });
      process.exit(1);
    }
  }
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "Successful", data: updateMovie });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: "Failed", message: error.message });
    } else {
      res
        .status(400)
        .json({ status: "Failed", message: "Unknown error occurred." });
    }
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deleteMovie) {
      res.status(404).json({ status: "Failed", message: "Movie not found." });
    }
    res
      .status(201)
      .json({ status: "Successful", message: "Movie deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: "Failed", message: error.message });
    } else {
      res
        .status(500)
        .json({ status: "Failed", message: "Unknown error occured." });
    }
  }
};

export { createMovie, deleteMovie, getAllMovies, getMovie, updateMovie };

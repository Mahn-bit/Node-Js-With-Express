import { NextFunction, Request, Response } from "express";
import Movie from "../model/movieSchema";

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

const getMovie = (req: Request, res: Response) => {};

const updateMovie = (req: Request, res: Response) => {};

const deleteMovie = (req: Request, res: Response) => {};

export { createMovie, deleteMovie, getAllMovies, getMovie, updateMovie };

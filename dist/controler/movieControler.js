"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.getAllMovies = exports.getStatus = exports.checkId = void 0;
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const moviesFilePath = process.env.MOVIES_FILE_PATH;
if (!moviesFilePath) {
    console.error(`Movies file path is not provided in the environment variable.`);
    process.exit(1);
}
const movies = JSON.parse((0, fs_1.readFileSync)(moviesFilePath, "utf-8"));
const checkId = (req, res, next, paramValue) => {
    const movieId = Number(paramValue);
    console.log(`Movie ID is ${movieId}`);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
    if (movieIndex === -1) {
        res.status(400).json({
            status: "Failed",
            message: `Movies with ID: ${movieId} not found`,
        });
        return;
    }
    next();
};
exports.checkId = checkId;
const getStatus = (req, res) => {
    res.status(200).json({ status: `OK` });
};
exports.getStatus = getStatus;
const getAllMovies = (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
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
exports.getAllMovies = getAllMovies;
const getMovie = (req, res) => {
    const movieId = Number(req.params.id);
    if (isNaN(movieId)) {
        res.status(400).json({ status: "Fail", message: `Invaid movie id.` });
    }
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
    const movie = movies[movieIndex];
    res.status(200).json({ status: `Succesful`, data: movie });
};
exports.getMovie = getMovie;
const createMovie = (req, res) => {
    const newId = movies[movies.length - 1].id + 1;
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
    (0, fs_1.writeFile)("data/movies.json", JSON.stringify(movies), (error) => {
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
exports.createMovie = createMovie;
const updateMovie = (req, res) => {
    const movieId = Number(req.params.id);
    if (isNaN(movieId)) {
        res.status(400).json({ status: "Failed", message: `Invalid movie id` });
    }
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
    const updatedMovie = {
        ...movies[movieIndex],
        ...req.body,
    };
    movies[movieIndex] = updatedMovie;
    (0, fs_1.writeFile)("data/movies.json", JSON.stringify(movies), (error) => {
        if (error) {
            res
                .status(500)
                .json({ status: "Failed", message: `Internal server error.` });
        }
        res.status(200).json({ status: "Successful", data: updatedMovie });
    });
};
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => {
    const movieId = Number(req.params.id);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
    const filteredMovies = movies.filter((movie) => movie.id !== movieId);
    movies.splice(0, movies.length, ...filteredMovies);
    (0, fs_1.writeFile)("data/movies.json", JSON.stringify(movies), (error) => {
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
exports.deleteMovie = deleteMovie;

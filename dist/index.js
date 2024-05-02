"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const moviesFilePath = process.env.MOVIES_FILE_PATH;
if (!moviesFilePath) {
    console.error(`Movies file path is not provided in the environment variable.`);
    process.exit(1);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
const movies = JSON.parse((0, fs_1.readFileSync)(moviesFilePath, "utf-8"));
app.get("/v1/movies", (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredMovies = movies.slice(startIndex, endIndex);
    res
        .status(200)
        .json({ status: "Successful", count: movies.length, data: filteredMovies });
});
//Get movie with id
app.get("/v1/movies/:id", (req, res) => {
    const parseId = parseInt(req.params.id);
    if (isNaN(parseId)) {
        res.status(400).json({ status: "Fail", message: `Invaid movie id` });
    }
    const foundMovieIndex = movies.findIndex((movie) => movie.id === parseId);
    if (foundMovieIndex === -1) {
        res.status(404).json({ status: 'Failed', message:  });
    }
    const movie = movies[foundMovieIndex];
});
app.post("/v1/movies", (req, res) => {
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
});
app.patch("/v1/movies/:id", (req, res) => {
    const parseId = parseInt(req.params.id);
    if (isNaN(parseId)) {
        res.status(400).json({ status: "Failed", message: `Invalid movie id` });
    }
    const foundMovieIndex = movies.findIndex((movie) => movie.id === parseId);
    if (foundMovieIndex === -1) {
        res.status(404).json({
            status: `Failed`,
            message: `Movies with ID: ${parseId} not found`,
        });
    }
    const updatedMovie = {
        ...movies[foundMovieIndex],
        ...req.body,
    };
    movies[foundMovieIndex] = updatedMovie;
    (0, fs_1.writeFile)("data/movies.json", JSON.stringify(movies), (error) => {
        if (error) {
            res
                .status(500)
                .json({ status: "Failed", message: `Internal server error.` });
        }
        res.status(200).json({ status: "Successful", data: updatedMovie });
    });
});
app.delete("/v1/movies/:id", (req, res) => {
    const parseId = Number(req.params.id);
    const filteredMovies = movies.filter((movie) => movie.id !== parseId);
    filteredMovies.forEach((movie, index) => {
        if (movie.id > parseId) {
            movie.id = index + 1;
        }
    });
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
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.getMovie = exports.getAllMovies = exports.deleteMovie = exports.createMovie = void 0;
const movieSchema_1 = __importDefault(require("../model/movieSchema"));
const createMovie = async (req, res) => {
    try {
        const newMovie = await movieSchema_1.default.create(req.body);
        console.log(newMovie);
        res.status(201).json({ status: "Successful", data: { newMovie } });
    }
    catch (error) {
        res.status(400).json({ status: "Failed", message: `${error}` });
    }
};
exports.createMovie = createMovie;
const getAllMovies = async (req, res) => {
    try {
        const movies = await movieSchema_1.default.find();
        res.status(200).json({ status: "Successful", data: { movies } });
    }
    catch (error) {
        console.error(`Error retrieving moveis ${error}`);
    }
};
exports.getAllMovies = getAllMovies;
const getMovie = (req, res) => { };
exports.getMovie = getMovie;
const updateMovie = (req, res) => { };
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => { };
exports.deleteMovie = deleteMovie;

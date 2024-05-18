"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required field!"],
        unique: true,
    },
    discription: {
        type: String,
        required: [true, "Discription is required field!"],
    },
    duration: { type: Number, required: [true, `Duration is required field!`] },
    rating: { type: Number, default: 1.0 },
}, { strict: "throw" });
const Movie = (0, mongoose_1.model)("Movie", movieSchema);
exports.default = Movie;

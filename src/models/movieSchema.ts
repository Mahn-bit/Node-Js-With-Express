import { Document, model, Schema } from "mongoose";

interface IMovie extends Document {
  name: string;
  description: string;
  duration: number;
  rating: number;
  totalRating: number;
  releaseYear: number;
  releasedate: Date;
  genre: string[];
  director: string[];
  coverImage: string;
  actors: string[];
  price: number;
}

const movieSchema = new Schema<IMovie>(
  {
    name: {
      type: String,
      required: [true, "Name is required field!"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Discription is required field!"],
    },
    duration: { type: Number, required: [true, `Duration is required field!`] },
    rating: {
      type: Number,
      default: 1.0,
      min: [0, "rating must be between 0 and 10"],
      max: [10, "rating must be between 0 and 10"],
    },
    totalRating: {
      type: Number,
      required: [true, "Total rating field is required!"],
      min: [0, "Total rating must be a positive number."],
    },
    releaseYear: {
      type: Number,
      required: [true, "realease year field is required!"],
      min: [1888, "Release year must be after 1888."],
    },
    releasedate: {
      type: Date,
      required: [true, "release year field is required!"],
    },

    genre: {
      type: [String],
      require: [true, "Genre field is required!"],
    },
    director: {
      type: [String],
      required: [true, "Director field is required!"],
    },

    actors: { type: [String], required: [true, "Actors field is required!"] },
    price: { type: Number, required: [true, "Price field is required!"] },
  },

  {
    timestamps: true,
    strict: "throw",
  }
);

const Movie = model<IMovie>("Movie", movieSchema);

export default Movie;

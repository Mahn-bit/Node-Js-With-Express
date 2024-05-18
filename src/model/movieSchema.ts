import { Document, model, Schema } from "mongoose";

interface IMovie extends Document {
  name: string;
  discription: string;
  duration: number;
  rating: number;
}

const movieSchema = new Schema<IMovie>(
  {
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
  },
  { strict: "throw" }
);

const Movie = model<IMovie>("Movie", movieSchema);

export default Movie;

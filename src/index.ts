import express, { Express, json, Request, Response } from "express";
import dotenv from "dotenv";
import { readFileSync, writeFile } from "fs";

dotenv.config();

const port = process.env.PORT || 3000;
const moviesFilePath = process.env.MOVIES_FILE_PATH;

if (!moviesFilePath) {
  console.error(
    `Movies file path is not provided in the environment variable.`
  );
  process.exit(1);
}

const app: Express = express();
app.use(express.json());
const movies = JSON.parse(readFileSync(moviesFilePath, "utf-8"));

app.get("/v1/movies", (req, res) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredMovies = movies.slice(startIndex, endIndex);

  res
    .status(200)
    .json({ status: "Successful", count: movies.length, data: filteredMovies });
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
});

app.patch("/v1/movies/:id", (req, res) => {
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) {
    res.status(400).json({ status: "Failed", message: `Invalid movie id` });
  }
  const foundMovieIndex = movies.findIndex(
    (movie: { id: number }) => movie.id === parseId
  );

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

  writeFile("data/movies.json", JSON.stringify(movies), (error) => {
    if (error) {
      res
        .status(500)
        .json({ status: "Failed", message: `Internal server error.` });
    }

    res.status(200).json({ status: "Successful", data: updatedMovie });
  });
});

app.delete("/v1/movies/:id", (req, res) => {
  const parseId: number = Number(req.params.id);
  const filteredMovies = movies.filter(
    (movie: { id: number }) => movie.id !== parseId
  );
  filteredMovies.forEach((movie: { id: number }, index: number) => {
    if (movie.id > parseId) {
      movie.id = index + 1;
    }
  });

  console.log(filteredMovies);

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
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

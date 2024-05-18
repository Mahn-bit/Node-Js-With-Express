const e = require("express");
const express = require("express");
const { readFileSync, writeFile } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));
const app = express();
router = express.Router();
const port = 3000;

// app.use(express.static("public"));
app.use(express.json());

const timeLine = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

const allMovies = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const filteredMovies = movies.slice(startIndex, endIndex);

    res.status(200).json({
      status: "Succesful",
      count: filteredMovies.length,
      data: filteredMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const newMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = {
    id: newId,
    ...req.body,
  };
  const requiredProps = ["id", "name", "release_year", "duration", "genre"];
  const missingProps = requiredProps.filter((props) => !(props in newMovie));
  if (missingProps.length > 0) {
    res.status(400).json({
      status: "Error",
      message: `Missing required property: ${missingProps.join(", ")}`,
    });
    return;
  }
  movies.push(newMovie);
  writeFile("data/movies.json", JSON.stringify(movies), (error) => {
    if (error) {
      res
        .status(500)
        .json({ status: "Failed", message: `Internal server error ` });
      return;
    }
    res.status(200).json({ status: "Succesful", data: newMovie });
  });
};

const updateMovie = (req, res) => {
  const requestedId = parseInt(req.params.id);
  if (isNaN(requestedId)) {
    res.status(400).json({ status: "Error", message: "Invalid movie ID." });
    return;
  }

  const findMovie = movies.find((movie) => movie.id === requestedId);
  if (!findMovie) {
    res.status(404).json({
      status: "Error",
      message: `Movie with the id ${requestedId} not found.`,
    });
    return;
  } else {
    const updatedMovie = { ...findMovie, ...req.body };
    const index = movies.findIndex((movie) => movie.index === findMovie.id);
    console.log(index);
    movies[index] = updatedMovie;
    writeFile("data/movies.json", JSON.stringify(movies), (error) => {
      if (error) {
        res
          .status(500)
          .json({ status: "Failed", message: "Internal Serval error" });
      }
      res
        .status(200)
        .json({ status: "Successfully Updated", data: updatedMovie });
    });
  }
};

const deleteMovie = (req, res) => {
  const requestedId = parseInt(req.params.id);
  if (requestedId === -1) {
    res.status(400).json({ status: "Error", maeesage: "Invalid movie ID." });
  }
  const findMovie = movies.find((movie) => movie.id === requestedId);
  let updatedMovies = movies.filter((movie) => movie.id !== requestedId);
  updatedMovies.forEach((movie, index) => {
    if (movie.id > requestedId) {
      movie.id = index + 1;
    }
  });

  writeFile("data/movies.json", JSON.stringify(updatedMovies), (error) => {
    if (error) {
      res
        .status(500)
        .json({ status: "Failed", message: "Internal server Error." });
    }
    res.status(200).json({ status: 200, data: findMovie });
  });
};

const movieGenre = (req, res) => {
  const getMovieGenre = req.params.movieGenre;
  if (getMovieGenre.length === 1) {
    res.status(400).json({
      status: "Failed",
      message: "No movie found with the requested genre.",
    });
  }
  const findMovies = movies.filter((movie) =>
    movie.genre.includes(getMovieGenre)
  );

  res.send("Tesing api");
};

router.use(timeLine);

router.get("/", allMovies).post(newMovie);

router.patch("/:id", updateMovie).delete("/:id", deleteMovie);

//Search movies by genre
app.get("/:movieGenre");

app.use("/v1/movies", router);

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

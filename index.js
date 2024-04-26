const e = require("express");
const express = require("express");
const { readFileSync, writeFile } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));
const app = express();
const port = 3000;

// app.use(express.static("public"));
app.use(express.json());

app.get("/v1/movies", (req, res) => {
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
});

app.post("/v1/movies", (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = {
    id: newId,
    ...req.body,
  };
  console.log(newMovie);
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
});

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

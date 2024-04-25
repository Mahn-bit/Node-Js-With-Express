const express = require("express");
const { readFileSync } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));
const app = express();
const port = 3000;

app.use(express.static("public"));

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

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

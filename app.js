const { readFileSync } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));

const movieId = {
  id: 1,
  name: "Inception",
  release_year: 2010,
  duration: 148,
  genre: ["Action", "Adventure", "Sci-Fi"],
};

const findMovies = movies.find((movie) => movie.id === movieId.id);

const index = movies.indexOf(findMovies);

console.log(index);
console.log(movies);

const { readFileSync, writeFileSync } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));

const findMovie = movies.find((movie) => movie.id === 7);

const index = movies.findIndex((movie) => movie.id === findMovie.id);

let count = 1;
movies.forEach((movie) => {
  movie.id = count;
  count++;
});

writeFileSync("data/movies.json", JSON.stringify(movies), (error) => {
  if (error) {
    console.error("Internal Server error");
  }
  
});
console.log(movies);

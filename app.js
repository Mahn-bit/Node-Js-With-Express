const { readFileSync, writeFileSync } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));

const foudMovieIndex = movies.findIndex((movie) => movie.id === 5);

const findMovie = movies.find((movie) => movie.id === 5);

console.log(foudMovieIndex);
console.log(findMovie);

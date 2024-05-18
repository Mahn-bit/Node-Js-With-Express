const { readFileSync } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json"));

const account = movies.find((movie) => movie.id === 1);

console.log(account);

const { readFileSync } = require("fs");

const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));

const count = movies.map((movie) => movie.id);
const newId = movies[movies.length - 1].id;

const countLength = count[count.length - 1];

console.log(newId);

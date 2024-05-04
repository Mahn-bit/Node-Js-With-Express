// const { readFileSync, writeFileSync } = require("fs");

// const movies = JSON.parse(readFileSync("data/movies.json", "utf-8"));

// const foudMovieIndex = movies.find((movie) => movie.id === 4);

// const getIndex = movies.indexOf(foudMovieIndex);

// const findMovie = movies.find((movie) => movie.id === 5);

// console.log(
//   [...Array(30)].map((e) => ((Math.random() * 36) | 0).toString(36)).join("")
// );

// const alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// console.log(alph.join(", "));

const date = new Date().toISOString();
const newDate = Date();

console.log(date);
console.log(newDate);

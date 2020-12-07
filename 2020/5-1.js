#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let directions = [];

rl.on("line", (line) => {
  directions.push(line);
}).on("close", () => {
  const highestID = directions
    .map((direction) => {
      const row = direction.substr(0, 7).split("").reduce(search, [0, 127])[0];
      const col = direction.substr(7, 3).split("").reduce(search, [0, 7])[0];

      const seatID = row * 8 + col;
      return seatID;
    })
    .reduce((a, b) => Math.max(a, b));
  console.log(highestID);
});

const search = ([low, high], direction) => {
  switch (direction) {
    case "F":
    case "L":
      return [low, high - Math.floor((high - low) / 2)];
    case "B":
    case "R":
      return [low + Math.ceil((high - low) / 2), high];
  }
  throw new Error();
};

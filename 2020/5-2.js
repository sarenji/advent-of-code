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
  const seatIDs = new Set(
    directions.map((direction) => {
      const row = direction.substr(0, 7).split("").reduce(search, [0, 127])[0];
      const col = direction.substr(7, 3).split("").reduce(search, [0, 7])[0];

      const seatID = row * 8 + col;
      return seatID;
    })
  );
  const possibleSeatIDs = [];
  for (let i = Math.min(...seatIDs); i <= Math.max(...seatIDs); i++) {
    possibleSeatIDs.push(i);
  }
  console.log(possibleSeatIDs.filter((x) => !seatIDs.has(x)));
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

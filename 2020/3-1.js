#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const [x, y] = [3, 1];
  let position = [0, 0];
  let numTrees = 0;

  while (position[1] < lines.length) {
    if (lines[position[1]][position[0]] === "#") {
      numTrees += 1;
    }
    position[0] = (position[0] + x) % lines[0].length;
    position[1] += y;
  }

  console.log(numTrees);
});

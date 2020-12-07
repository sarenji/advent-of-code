#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(parseInt(line, 10));
}).on("close", () => {
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[i] + lines[j] === 2020) {
        console.log(lines[i] * lines[j]);
      }
    }
  }
});

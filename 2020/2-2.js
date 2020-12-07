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
  let validPasswords = 0;
  lines.forEach((line) => {
    const [a, b, letter, password] = line.split(/[-: ]+/g);
    if (
      (password[parseInt(a, 10) - 1] === letter) ^
      (password[parseInt(b, 10) - 1] === letter)
    ) {
      validPasswords += 1;
    }
  });

  console.log(validPasswords);
});

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
    const [min, max, letter, password] = line.split(/[-: ]+/g);
    const charMap = new Map();
    password.split("").forEach((char) => {
      const count = (charMap.get(char) || 0) + 1;
      charMap.set(char, count);
    });
    const letterCount = charMap.get(letter);
    if (letterCount >= parseInt(min, 10) && letterCount <= parseInt(max, 10)) {
      validPasswords++;
    }
  });

  console.log(validPasswords);
});

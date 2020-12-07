#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const passports = [""];

rl.on("line", (line) => {
  if (line.length === 0) {
    passports.push("");
  } else {
    const passport = passports[passports.length - 1];
    // Ensure each line added has a blank separator, but not the first.
    passports[passports.length - 1] = [passport, line]
      .filter(Boolean)
      .join(" ");
  }
}).on("close", () => {
  let numValidPassports = 0;
  passports.forEach((passport) => {
    const requiredFields = {
      byr: 0,
      iyr: 0,
      eyr: 0,
      hgt: 0,
      hcl: 0,
      ecl: 0,
      pid: 0,
    };
    passport.split(/\s+/g).forEach((entry) => {
      const field = entry.split(":")[0];
      if (requiredFields.hasOwnProperty(field)) {
        requiredFields[field] += 1;
      }
    });

    const isValidPassport = Object.values(requiredFields)
      .map(Boolean)
      .reduce((a, b) => a && b);
    if (isValidPassport) {
      numValidPassports += 1;
    }
  });

  console.log(numValidPassports);
});

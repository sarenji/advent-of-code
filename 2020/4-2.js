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
      const [field, value] = entry.split(":");
      if (requiredFields.hasOwnProperty(field) && validateField(field, value)) {
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

function validateField(field, value) {
  if (field === "byr") {
    const year = parseInt(value, 10);
    return year >= 1920 && year <= 2002;
  } else if (field === "iyr") {
    const year = parseInt(value, 10);
    return year >= 2010 && year <= 2020;
  } else if (field === "eyr") {
    const year = parseInt(value, 10);
    return year >= 2020 && year <= 2030;
  } else if (field === "hgt") {
    const match = /^(\d+)(cm|in)$/.exec(value);
    if (!match) {
      return false;
    }
    let [_, height, unit] = match;
    if (!height || !unit) {
      return false;
    }
    height = parseInt(height, 10);
    if (unit === "cm") {
      return height >= 150 && height <= 193;
    } else if (unit === "in") {
      return height >= 59 && height <= 76;
    }
    return false;
  } else if (field === "hcl") {
    return /^#[0-9a-f]{6}$/.test(value);
  } else if (field === "ecl") {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
  } else if (field === "pid") {
    return /^\d{9}$/.test(value);
  }
  return false;
}

console.log("byr valid:", validateField("byr", "2002"));
console.log("byr invalid:", !validateField("byr", "2003"));

console.log("hgt valid:", validateField("hgt", "60in"));
console.log("hgt valid:", validateField("hgt", "190cm"));
console.log("hgt invalid:", !validateField("hgt", "190in"));
console.log("hgt invalid:", !validateField("hgt", "190"));

console.log("hcl valid:", validateField("hcl", "#123abc"));
console.log("hcl invalid:", !validateField("hcl", "#123abz"));
console.log("hcl invalid:", !validateField("hcl", "123abc"));

console.log("ecl valid:", validateField("ecl", "brn"));
console.log("ecl invalid:", !validateField("ecl", "wat"));

console.log("pid valid:", validateField("pid", "000000001"));
console.log("pid invalid:", !validateField("pid", "0123456789"));

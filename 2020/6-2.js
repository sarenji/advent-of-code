#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let groups = [[]];

rl.on("line", (line) => {
  if (line.length === 0) {
    groups.push([]);
  } else {
    groups[groups.length - 1].push(line);
  }
}).on("close", () => {
  let sumCounts = 0;
  groups.forEach((group) => {
    const answers = {};
    const numPeople = group.length;
    group.forEach((person) => {
      person.split("").forEach((answer) => {
        answers[answer] = (answers[answer] || 0) + 1;
      });
    });
    sumCounts += Object.values(answers).filter((answer) => answer === numPeople)
      .length;
  });
  console.log(sumCounts);
});

import assert from "assert";
import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const printScreen = (screen: string[][]) => {
  for (const row of screen) {
    console.log(row.join(""));
  }
};
const rect = (screen: string[][], width: number, height: number) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      screen[i][j] = `#`;
    }
  }
};
const row = (screen: string[][], row: number, amount: number) => {
  for (let j = 0; j < amount; j++) {
    let overflow = [];
    for (let i = 0; i < screen[row].length; i++) {
      overflow.push(screen[row][i]);
    }
    for (let i = 0; i < screen[row].length; i++) {
      if (i === 0) {
        screen[row][i] = overflow[overflow.length - 1];
      } else {
        screen[row][i] = overflow[i - 1];
      }
    }
  }
};
const column = (screen: string[][], column: number, amount: number) => {
  for (let j = 0; j < amount; j++) {
    let overflow = [];
    for (let i = 0; i < screen.length; i++) {
      overflow.push(screen[i][column]);
    }
    for (let i = 0; i < screen.length; i++) {
      if (i === 0) {
        screen[i][column] = overflow[overflow.length - 1];
      } else {
        screen[i][column] = overflow[i - 1];
      }
    }
  }
};

const columns = 50;
const rows = 6;
const screen: string[][] = Array.from(Array(rows), (_) =>
  Array(columns).fill(".")
);
const instructions = syncReadFile("./input.txt")
  .split("\n")
  .map((instruction) => {
    if (instruction.includes("rect")) {
      const [_, [width, height]] = instruction
        .split(" ")
        .map((value) => value.split("x"));
      return {
        command: "rect",
        height: parseInt(height),
        width: parseInt(width),
      };
    } else if (instruction.includes("row")) {
      const [_, [row, amount]] = instruction
        .split("y=")
        .map((value) => value.split(" by "));

      return { command: "row", row: parseInt(row), amount: parseInt(amount) };
    } else {
      const [_, [column, amount]] = instruction
        .split("x=")
        .map((value) => value.split(" by "));

      return {
        command: "column",
        column: parseInt(column),
        amount: parseInt(amount),
      };
    }
  });
for (const instruction of instructions) {
  switch (instruction.command) {
    case "rect":
      if (instruction.width === undefined) {
        break;
      }
      rect(screen, instruction.width, instruction.height);
      break;
    case "row":
      if (instruction.row === undefined) {
        break;
      }
      row(screen, instruction.row, instruction.amount);
      break;
    case "column":
      if (instruction.column === undefined) {
        break;
      }
      column(screen, instruction.column, instruction.amount);
      break;
    default:
      console.log("something went horibly wrong");
      break;
  }
}
let pixels = 0;
for (const row of screen) {
  for (const pixel of row) {
    if (pixel === "#") {
      pixels++;
    }
  }
}
console.log(`Part A: ${pixels}`);
console.log(`Part B: `);
printScreen(screen);

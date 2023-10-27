import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const treeHeights = syncReadFile("./input.txt")
  .split("\n")
  .map((row) => row.split("").map((height) => parseInt(height)));

const width = treeHeights[0].length;
const height = treeHeights.length;
const order = Math.max(width.toString().length, height.toString().length);

const scenicValues: Record<string, number[]> = {};

function stringifyTreePosition(x: number, y: number) {
  return `${x.toString().padStart(order, "0")}${y
    .toString()
    .padStart(order, "0")}`;
}

function checkNorth(x: number, y: number) {
  let lengthChecked = 1;
  for (let ray = y - 1; ray >= 0; ray--) {
    if (treeHeights[ray][x] >= treeHeights[y][x]) {
      return lengthChecked;
    } else {
      lengthChecked++;
    }
  }
  return --lengthChecked;
}

function checkWest(x: number, y: number) {
  let lengthChecked = 1;
  for (let ray = x - 1; ray >= 0; ray--) {
    if (treeHeights[y][ray] >= treeHeights[y][x]) {
      return lengthChecked;
    } else {
      lengthChecked++;
    }
  }
  return --lengthChecked;
}

function checkSouth(x: number, y: number) {
  let lengthChecked = 1;
  for (let ray = 1; ray < height - y; ray++) {
    if (treeHeights[y + ray][x] >= treeHeights[y][x]) {
      return lengthChecked;
    } else {
      lengthChecked++;
    }
  }
  return --lengthChecked;
}

function checkEast(x: number, y: number) {
  let lengthChecked = 1;
  for (let ray = 1; ray < width - x; ray++) {
    if (treeHeights[y][x + ray] >= treeHeights[y][x]) {
      return lengthChecked;
    } else {
      lengthChecked++;
    }
  }
  return --lengthChecked;
}

export default function partB(): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        scenicValues[stringifyTreePosition(y, x)] = [0, 0, 0, 0];
      } else {
        scenicValues[stringifyTreePosition(x, y)] = [
          checkNorth(y, x),
          checkSouth(y, x),
          checkEast(y, x),
          checkWest(y, x),
        ];
      }
    }
  }
  console.log(
    `The highest scenic score is: ${Math.max(
      ...Object.values(scenicValues).map((values) =>
        values.reduce((a, b) => a * b, 1)
      )
    )}`
  );
}

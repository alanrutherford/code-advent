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

const visible: Record<string, boolean> = {};

function stringifyTreePosition(x: number, y: number) {
  return `${x.toString().padStart(order)}${y.toString().padStart(order)}`;
}

function checkNorth(x: number, y: number) {
  let lengthToCheck = y;
  for (let ray = 0; ray < lengthToCheck; ray++) {
    if (treeHeights[x][ray] >= treeHeights[x][y]) {
      return false;
    }
  }
  return true;
}

function checkSouth(x: number, y: number) {
  let lengthToCheck = height - y;
  for (let ray = 1; ray < lengthToCheck; ray++) {
    if (treeHeights[x][y + ray] >= treeHeights[x][y]) return false;
  }
  return true;
}

function checkEast(x: number, y: number) {
  let lengthToCheck = x;
  for (let ray = 0; ray < lengthToCheck; ray++) {
    if (treeHeights[ray][y] >= treeHeights[x][y]) return false;
  }
  return true;
}

function checkWest(x: number, y: number) {
  let lengthToCheck = width - x;
  for (let ray = 1; ray < lengthToCheck; ray++) {
    if (treeHeights[x + ray][y] >= treeHeights[x][y]) return false;
  }
  return true;
}

function onEdge(x: number, y: number) {
  return x === 0 || y === 0 || x === width - 1 || y === height - 1;
}

export default function partA(): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (onEdge(y, x)) {
        visible[stringifyTreePosition(y, x)] = true;
        continue;
      }
      if (checkNorth(y, x)) {
        visible[stringifyTreePosition(y, x)] = true;
        continue;
      } else if (checkSouth(y, x)) {
        visible[stringifyTreePosition(y, x)] = true;
        continue;
      } else if (checkEast(y, x)) {
        visible[stringifyTreePosition(y, x)] = true;
        continue;
      } else if (checkWest(y, x)) {
        visible[stringifyTreePosition(y, x)] = true;
        continue;
      }
      visible[stringifyTreePosition(y, x)] = false;
    }
  }
  console.log(
    `There are ${
      Object.values(visible).filter((visible) => visible).length
    } trees visible`
  );
}

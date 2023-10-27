import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const directions = syncReadFile("./input.txt").split("");
  let housesDelivered = new Set<string>();
  let xPos = 0;
  let yPos = 0;
  housesDelivered.add(`${xPos}${yPos}`);
  for (const direction of directions) {
    switch (direction) {
      case "<":
        xPos--;
        break;
      case ">":
        xPos++;
        break;
      case "^":
        yPos++;
        break;
      case "v":
        yPos--;
        break;
    }
    if (!housesDelivered.has(`${xPos}${yPos}`)) {
      housesDelivered.add(`${xPos}${yPos}`);
    }
  }
  console.log(`Part A: There was ${housesDelivered.size} houses delivered to`);
}

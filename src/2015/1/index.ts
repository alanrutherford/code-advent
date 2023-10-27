import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const levelInstructions = syncReadFile("./input.txt");
const up = levelInstructions.split("(").length - 1;
const down = levelInstructions.split(")").length - 1;

console.log(`Part A: Santa is on level ${up - down}`);

const steps = syncReadFile("./input.txt").split("");
let level = 0;
for (let i = 0; i < steps.length; i++) {
  if (steps[i] === "(") {
    level++;
  } else {
    level--;
  }
  if (level === -1) {
    console.log(`Part B: Basement in position ${i + 1}`);
    break;
  }
}

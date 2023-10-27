import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
enum operation {
  turnOff = "turn off",
  turnOn = "turn on",
  toggle = "toggle",
}
type coordinate = {
  x: number;
  y: number;
};
const ROW_COUNT = 1000;
type instruction = {
  operation: operation;
  cornerOne: coordinate;
  cornerTwo: coordinate;
};
const parseInstruction = (operation: operation, instruction: string) => {
  const coords = instruction
    .split(operation)[1]
    .split("through")
    .map((coords) => coords.trim())
    .map((coord) => {
      const split = coord.split(",");
      return { x: parseInt(split[0]), y: parseInt(split[1]) };
    });
  return {
    operation,
    cornerOne: coords[0],
    cornerTwo: coords[1],
  };
};
export default function partB(): void {
  const instructions = syncReadFile("./input.txt")
    .split("\n")
    .map((instruction) => {
      if (instruction.includes("toggle")) {
        return parseInstruction(operation.toggle, instruction);
      } else if (instruction.includes("turn on")) {
        return parseInstruction(operation.turnOn, instruction);
      } else return parseInstruction(operation.turnOff, instruction);
    });
  const lightArray: number[][] = Array.from(Array(ROW_COUNT), (_) =>
    Array(ROW_COUNT).fill(0)
  );
  for (const instruction of instructions) {
    switch (instruction.operation) {
      case operation.toggle:
        for (
          let i = instruction.cornerOne.x;
          i <= instruction.cornerTwo.x;
          i++
        ) {
          for (
            let j = instruction.cornerOne.y;
            j <= instruction.cornerTwo.y;
            j++
          ) {
            lightArray[i][j] += 2;
          }
        }
        break;
      case operation.turnOff:
        for (
          let i = instruction.cornerOne.x;
          i <= instruction.cornerTwo.x;
          i++
        ) {
          for (
            let j = instruction.cornerOne.y;
            j <= instruction.cornerTwo.y;
            j++
          ) {
            if (lightArray[i][j] === 0) {
              continue;
            }
            lightArray[i][j]--;
          }
        }
        break;
      case operation.turnOn:
        for (
          let i = instruction.cornerOne.x;
          i <= instruction.cornerTwo.x;
          i++
        ) {
          for (
            let j = instruction.cornerOne.y;
            j <= instruction.cornerTwo.y;
            j++
          ) {
            lightArray[i][j]++;
          }
        }
        break;
    }
  }
  const totalBrightness = lightArray
    .map((row) => row.reduce((a, b) => a + b))
    .reduce((a, b) => a + b);
  console.log(`Part B: The total brightness is: ${totalBrightness}`);
}

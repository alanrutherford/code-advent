import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

// noop takes 1 cycle
// addx takes two cycles

export default function partA(): void {
  const instructions = syncReadFile("./input.txt").split("\n");
  let registerX = 1;
  let cycleCount = 0;
  const signalStrengths: number[] = [];
  const incrementCycleCount = () => {
    cycleCount++;
    if (cycleCount === 20 + signalStrengths.length * 40) {
      signalStrengths.push((20 + signalStrengths.length * 40) * registerX);
    }
  };

  for (const instruction of instructions) {
    if (instruction.includes("noop")) {
      incrementCycleCount();
    } else {
      incrementCycleCount();
      incrementCycleCount();
      registerX += parseInt(instruction.split(" ")[1]);
    }
  }
  console.log(
    `The sum of the signal strengths is: ${signalStrengths.reduce(
      (sum, current) => sum + current,
      0
    )}`
  );
}

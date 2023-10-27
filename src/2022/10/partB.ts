import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  const instructions = syncReadFile("./input.txt").split("\n");
  let registerX = 1;
  let cycleCount = 0;
  const pixels: string[] = new Array(240).fill("*");
  const printPixels = () => {
    for (let i = 0; i < 240; i++) {
      if (i % 40 === 0) {
        process.stdout.write("\n");
      }
      process.stdout.write(pixels[i]);
    }
    process.stdout.write("\n");
  };
  const drawPixel = () => {
    // if cycleCount is on register x +/- 1 then pixel[cycleCount] = # else .
    if (
      cycleCount % 40 === registerX - 1 ||
      cycleCount % 40 === registerX ||
      cycleCount % 40 === registerX + 1
    ) {
      pixels[cycleCount] = "#";
    } else {
      pixels[cycleCount] = " ";
    }
  };
  const incrementCycleCount = () => {
    drawPixel();
    cycleCount++;
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
  printPixels();
}

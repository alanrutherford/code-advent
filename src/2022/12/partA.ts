import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const terrain = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => line.split(""));
  console.log(terrain);
}

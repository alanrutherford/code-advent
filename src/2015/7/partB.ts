import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  const strings = syncReadFile("./input.txt").split("\n");

  console.log(`Part B: There are ${strings.length} nice strings`);
}

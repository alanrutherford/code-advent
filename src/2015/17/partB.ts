import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  console.log("NOT COMPLETED");
  const input = syncReadFile("./input.txt");

  console.log(`Part B:  `);
}

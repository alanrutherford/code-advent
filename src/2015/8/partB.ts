import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "node:crypto";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const md5 = (data: string) => createHash("md5").update(data).digest("hex");
export default function partB(): void {
  const strings = syncReadFile("./input.txt").split("\n");

  console.log(`Part B: There are ${strings.length} strings`);
}

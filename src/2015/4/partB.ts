import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "node:crypto";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const md5 = (data: string) => createHash("md5").update(data).digest("hex");
export default function partB(): void {
  const secretKey = syncReadFile("./input.txt");
  let notFound = true;
  let number = 1;
  while (notFound) {
    const hash = md5(secretKey + number);
    const firstSix = hash.slice(0, 6);
    if (firstSix === "000000") {
      notFound = false;
    } else {
      number++;
    }
  }
  console.log(`Part B: The smallest  positive number is ${number}`);
}

import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "node:crypto";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const md5 = (data: string) => createHash("md5").update(data).digest("hex");
export default function partA(): void {
  const secretKey = syncReadFile("./input.txt");
  let notFound = true;
  let number = 1;
  while (notFound) {
    const hash = md5(secretKey + number);
    const firstFive = hash.slice(0, 5);
    if (firstFive === "00000") {
      notFound = false;
    } else {
      number++;
    }
  }
  console.log(`Part A: The smallest  positive number is ${number}`);
}

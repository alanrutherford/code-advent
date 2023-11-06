import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "node:crypto";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const md5 = (data: string) => createHash("md5").update(data).digest("hex");
export default function partB(): void {
  const doorId = syncReadFile("./input.txt");
  let number = 1;
  let notFound = true;
  const code: string[] = new Array(8).fill("_");
  while (notFound) {
    const hash = md5(doorId + number);
    const firstFive = hash.slice(0, 5);
    if (firstFive === "00000") {
      // console.log(doorId + number);
      const position = parseInt(hash.charAt(5));
      if (position < 8 && code[position] === "_") {
        code[position] = hash.charAt(6);
        console.log(code.join(""));
      }

      // code.push(hash.charAt(5));
      number++;
    } else {
      number++;
    }
    if (!code.includes("_")) {
      notFound = false;
    }
  }
  console.log(`Part B: ${code.join("")}`);
}

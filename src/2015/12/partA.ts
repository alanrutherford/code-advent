import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const input = syncReadFile("./input.txt").match(
    /[-]{0,1}[\d]*[.]{0,1}[\d]+/g
  );

  let runningSum = 0;
  if (!input) return;
  for (const num of input) {
    runningSum += parseInt(num);
  }
  console.log(`Part A: The sum of all the numbers is: ${runningSum} `);
}

import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const removeRed = (jsonBlob: any) => {
  if (typeof jsonBlob === "object" && !Array.isArray(jsonBlob)) {
    for (const key in jsonBlob) {
      if (jsonBlob[key] === "red") {
        return 0;
      }
    }
  }
  let total = 0;
  for (const key in jsonBlob) {
    if (typeof jsonBlob[key] === "object") {
      total += removeRed(jsonBlob[key]);
    } else if (typeof jsonBlob[key] === "number") {
      total += jsonBlob[key];
    }
  }
  return total;
};
export default function partB(): void {
  const input = JSON.parse(syncReadFile("./input.txt"));
  let runningSum = removeRed(input);
  console.log(`Part B: The sum of all the numbers is: ${runningSum} `);
}

import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const inMemSize = (singleString: string) => {
  const escapedQuotes = singleString.split('\\"').length - 1;
  const escapedSlash = singleString.split("\\\\").length - 1;
  const asciiChar = singleString.split("\\x").length - 1;
  return singleString.length - 2 - escapedQuotes - escapedSlash - 3 * asciiChar;
};
export default function partA(): void {
  const strings = syncReadFile("./input.txt").split("\n");
  let stringLiteralSize = 0;
  let inMemStringSize = 0;
  for (const singleString of strings) {
    stringLiteralSize += singleString.length;
    inMemStringSize += inMemSize(singleString);
  }
  console.log(
    `Part A: The difference in string literal size and in memory size is ${stringLiteralSize} - ${inMemStringSize} = ${
      stringLiteralSize - inMemStringSize
    }`
  );
}

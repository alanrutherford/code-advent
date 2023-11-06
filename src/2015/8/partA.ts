import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const inMemSize = (singleString: string) => {
  const escapedSlash = singleString.split("\\\\").length - 1;
  const singleStringRemovedSlash = singleString.replace("\\\\", "");
  const escapedQuotes = singleStringRemovedSlash.split('\\"').length - 1;
  const singleStringRemovedSlashAndQuote = singleStringRemovedSlash.replace(
    '\\"',
    ""
  );
  const asciiChar = singleStringRemovedSlashAndQuote.split("\\x").length - 1;
  return singleString.length - escapedQuotes - escapedSlash - 3 * asciiChar;
};

export default function partA(): void {
  const strings = syncReadFile("./input.txt").split("\n");
  let stringLiteralSize = 0;
  let inMemStringSize = 0;
  for (const singleString of strings) {
    stringLiteralSize += singleString.length;
    inMemStringSize += inMemSize(
      singleString.substring(1, singleString.length - 1)
    );
  }
  console.log(
    `Part A: The difference in string literal size and in memory size is ${stringLiteralSize} - ${inMemStringSize} = ${
      stringLiteralSize - inMemStringSize
    }`
  );
}

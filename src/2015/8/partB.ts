import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const encodeString = (singleString: string) => {
  const slashRegExp = /\\/gi;
  const quoteRegExp = /\"/gi;
  const encodedSlash = singleString.replace(slashRegExp, "\\\\");
  const encodedQuotes = encodedSlash.replace(quoteRegExp, '\\"');
  return encodedQuotes.length + 2;
};
export default function partB(): void {
  const strings = syncReadFile("./input.txt").split("\n");
  let stringLiteralSize = 0;
  let encodedStringSize = 0;
  for (const singleString of strings) {
    stringLiteralSize += singleString.length;
    encodedStringSize += encodeString(singleString);
  }
  console.log(
    `Part B: The difference in newly encoded string size and in original string size is ${encodedStringSize} - ${stringLiteralSize}  = ${
      encodedStringSize - stringLiteralSize
    }`
  );
}

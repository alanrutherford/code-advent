import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "node:crypto";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const VOWELS = ["a", "e", "i", "o", "u"];
const BAD_COMBOS = ["ab", "cd", "pq", "xy"];
const twoPairs = (stringToCheck: string) => {
  for (let i = 0; i < stringToCheck.length - 1; i++) {
    const subString = stringToCheck.substring(i, i + 2);
    const lastOccuranceOfSubstring = stringToCheck.lastIndexOf(subString);
    if (lastOccuranceOfSubstring - i >= 2) {
      return true;
    }
  }
  return false;
};

const repeatedCharWithSpace = (stringToCheck: string) => {
  for (let i = 0; i < stringToCheck.length; i++) {
    if (stringToCheck.at(i) === stringToCheck.at(i + 2)) {
      return true;
    }
  }
  return false;
};

const isNice = (stringToCheck: string) => {
  if (!twoPairs(stringToCheck)) {
    return false;
  }
  if (!repeatedCharWithSpace(stringToCheck)) {
    return false;
  }
  return true;
};
export default function partB(): void {
  const strings = syncReadFile("./input.txt").split("\n");
  const niceStrings = strings
    .map((stringToCheck) => isNice(stringToCheck))
    .filter((nice) => nice);
  console.log(`Part B: There are ${niceStrings.length} nice strings`);
}

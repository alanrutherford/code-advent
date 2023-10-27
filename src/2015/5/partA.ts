import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "node:crypto";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const VOWELS = ["a", "e", "i", "o", "u"];
const BAD_COMBOS = ["ab", "cd", "pq", "xy"];
const threeVowels = (stringToCheck: string) => {
  let vowelOccurances = 0;
  for (let i = 0; i < stringToCheck.length; i++) {
    const char = stringToCheck.at(i);

    if (char && VOWELS.includes(char)) {
      vowelOccurances++;
      if (vowelOccurances >= 3) {
        return true;
      }
    }
  }
  return false;
};

const repeatedChar = (stringToCheck: string) => {
  for (let i = 1; i < stringToCheck.length; i++) {
    if (stringToCheck.at(i - 1) === stringToCheck.at(i)) {
      return true;
    }
  }
  return false;
};

const isNice = (stringToCheck: string) => {
  if (BAD_COMBOS.some((badness) => stringToCheck.includes(badness))) {
    return false;
  }
  if (!threeVowels(stringToCheck)) {
    return false;
  }
  if (!repeatedChar(stringToCheck)) {
    return false;
  }
  return true;
};
export default function partA(): void {
  const strings = syncReadFile("./input.txt").split("\n");
  const niceStrings = strings
    .map((stringToCheck) => isNice(stringToCheck))
    .filter((nice) => nice);
  console.log(`Part A: There are ${niceStrings.length} nice strings`);
}

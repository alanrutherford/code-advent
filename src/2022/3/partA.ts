import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
function letterToValue(letter: number) {
  if (letter < 91) {
    // UpperCase
    return letter - 38;
  } else {
    // Lowercase
    return letter - 96;
  }
}
export default function partA(): void {
  const rucksackContents = syncReadFile("./input.txt")
    .split("\n")
    .map((round) => [
      round.slice(0, round.length / 2),
      round.slice(round.length / 2),
    ]);

  const matchingItemValues = rucksackContents
    .map((contents) => {
      return [...contents[0]].filter((item) => contents[1].includes(item));
    })
    .map((item) => letterToValue(item[0].charCodeAt(0)));

  console.log(
    `Part A: Total score: ${matchingItemValues.reduce(
      (sum, current) => sum + current,
      0
    )}`
  );
}

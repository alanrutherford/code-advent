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
export default function partB(): void {
  const rucksacks = syncReadFile("./input.txt").split("\n");
  const badges: number[] = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    const badgeType = [...rucksacks[i]].filter(
      (item) =>
        rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)
    );
    if (badgeType) {
      badges.push(letterToValue(badgeType[0].charCodeAt(0)));
    }
  }
  console.log(
    `Part B: Group Priorities: ${badges.reduce(
      (sum, current) => sum + current,
      0
    )}`
  );
}

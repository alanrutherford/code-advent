import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const pairedSections = syncReadFile("./input.txt")
    .split("\n")
    .map((allocation) =>
      allocation
        .split(",")
        .map((range) => range.split("-").map((value) => parseInt(value)))
    );
  const doubleUps = pairedSections.map((pairings) => {
    const firstElf = pairings[0];
    const secondElf = pairings[1];
    let low = Math.min(firstElf[0], secondElf[0]);
    let high = Math.max(firstElf[1], secondElf[1]);
    return (
      JSON.stringify([low, high]) === JSON.stringify(firstElf) ||
      JSON.stringify([low, high]) === JSON.stringify(secondElf)
    );
  });
  console.log(
    `Total double ups: ${doubleUps.filter((result) => result).length}`
  );
}

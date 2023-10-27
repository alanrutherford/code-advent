import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
export default function partB(): void {
  const pairedSections = syncReadFile("./input.txt")
    .split("\n")
    .map((allocation) =>
      allocation
        .split(",")
        .map((range) => range.split("-").map((value) => parseInt(value)))
    );
  const overlaps = pairedSections.map((pairings) => {
    const firstElf = pairings[0];
    const secondElf = pairings[1];

    return (
      (firstElf[0] >= secondElf[0] && firstElf[0] <= secondElf[1]) ||
      (secondElf[0] >= firstElf[0] && secondElf[0] <= firstElf[1])
    );
  });
  console.log(`Total overlaps: ${overlaps.filter((result) => result).length}`);
}

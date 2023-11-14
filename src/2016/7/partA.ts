import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const checkForABBA = (section: string) => {
  for (let i = 0; i + 3 < section.length; i++) {
    if (
      section[i] === section[i + 3] &&
      section[i + 1] === section[i + 2] &&
      section[i + 3] !== section[i + 1]
    ) {
      return true;
    }
  }
  return false;
};
export default function partA(): void {
  const ips = syncReadFile("./input.txt")
    .split("\n")
    .map((ipv7) => {
      const openBrackets: number[] = [];
      const closeBrackets: number[] = [];
      const nonHypernetSequences: string[] = [];
      const hypernetSequences: string[] = [];

      for (let i = 0; i < ipv7.length; i++) {
        if (ipv7[i] === "[") {
          openBrackets.push(i);
        }
        if (ipv7[i] === "]") {
          closeBrackets.push(i);
        }
      }
      nonHypernetSequences.push(ipv7.substring(0, openBrackets[0]));
      for (let i = 0; i < openBrackets.length; i++) {
        hypernetSequences.push(
          ipv7.substring(openBrackets[i] + 1, closeBrackets[i])
        );
        nonHypernetSequences.push(
          ipv7.substring(closeBrackets[i] + 1, openBrackets[i + 1])
        );
      }
      return { nonHypernetSequences, hypernetSequences };
    });
  let validIps = 0;
  for (const ip of ips) {
    const hyperNet =
      ip.hypernetSequences.filter((hypernet) => checkForABBA(hypernet)).length >
      0;
    const nonHyperNet =
      ip.nonHypernetSequences.filter((hypernet) => checkForABBA(hypernet))
        .length > 0;
    if (!hyperNet && nonHyperNet) {
      validIps += 1;
    }
  }
  console.log(`Part A: There are ${validIps} valid Ips`);
}

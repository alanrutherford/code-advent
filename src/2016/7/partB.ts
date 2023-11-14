import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const sslCheck = (superNets: string[], hyperNets: string[]) => {
  for (const supernet of superNets) {
    for (let i = 0; i + 2 < supernet.length; i++) {
      if (supernet[i] !== supernet[i + 1] && supernet[i] === supernet[i + 2]) {
        for (const hypernet of hyperNets) {
          for (let j = 0; j + 2 < hypernet.length; j++) {
            if (
              hypernet[j] !== hypernet[j + 1] &&
              hypernet[j] === hypernet[j + 2] &&
              hypernet[j] === supernet[i + 1] &&
              hypernet[j + 1] === supernet[i]
            ) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
};
export default function partB(): void {
  const ips = syncReadFile("./input.txt")
    .split("\n")
    .map((ipv7) => {
      const openBrackets: number[] = [];
      const closeBrackets: number[] = [];
      const supernetSequences: string[] = [];
      const hypernetSequences: string[] = [];

      for (let i = 0; i < ipv7.length; i++) {
        if (ipv7[i] === "[") {
          openBrackets.push(i);
        }
        if (ipv7[i] === "]") {
          closeBrackets.push(i);
        }
      }
      supernetSequences.push(ipv7.substring(0, openBrackets[0]));
      for (let i = 0; i < openBrackets.length; i++) {
        hypernetSequences.push(
          ipv7.substring(openBrackets[i] + 1, closeBrackets[i])
        );
        supernetSequences.push(
          ipv7.substring(closeBrackets[i] + 1, openBrackets[i + 1])
        );
      }
      return { supernetSequences, hypernetSequences };
    });
  let sslIps = 0;
  for (const ip of ips) {
    if (sslCheck(ip.supernetSequences, ip.hypernetSequences)) {
      sslIps += 1;
    }
  }
  console.log(`Part B: There are ${sslIps} valid Ips`);
}

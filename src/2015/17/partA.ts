import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const LITRES = 150;
const getPerms = (inputArr: number[]) => {
  let subSet = new Set<string>();
  const permute = (arr: number[], m: number[] = []) => {
    const sum = m.reduce((partialSum, a) => partialSum + a, 0);
    if (sum === LITRES) {
      const sorted = m.sort();
      subSet.add(`${sorted.join(",")}`);
    } else if (sum > LITRES) {
      return;
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return Array.from(subSet);
};
export default function partA(): void {
  console.log("NOT COMPLETED");
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((value) => parseInt(value));
  const perms = getPerms(input);
  const multipleContainers: any = {};
  input.forEach((x) => {
    multipleContainers[x] = (multipleContainers[x] || 0) + 1;
  });
  let numberOfContainers = perms.length;
  for (const container in multipleContainers) {
    if (multipleContainers[container] > 1) {
      for (const perm in perms) {
        const continersToCheck = perms[perm].split(",").map((x) => parseInt(x));
        let occurances = continersToCheck.filter(
          (checking) => checking === parseInt(container)
        );
        if (
          occurances.length != 0 &&
          occurances.length < multipleContainers[container]
        ) {
          numberOfContainers++;
        }
      }
    }
  }
  console.log(
    `Part A: There are ${numberOfContainers} different combinations ${perms.length}`
  );
}

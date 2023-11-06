import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((movements) => movements.split(""));
  let key = { x: 1, y: 1 };
  const code: number[] = [];
  const numPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  for (const nextNumber of input) {
    for (const movement of nextNumber) {
      switch (movement) {
        case "R":
          if (key.x < 2) {
            key.x = key.x + 1;
          }
          break;
        case "L":
          if (key.x > 0) {
            key.x = key.x - 1;
          }
          break;
        case "U":
          if (key.y > 0) {
            key.y = key.y - 1;
          }
          break;
        case "D":
          if (key.y < 2) {
            key.y = key.y + 1;
          }
          break;
      }
    }
    code.push(numPad[key.y][key.x]);
  }
  console.log(`Part A: The bathroom code should be ${code}`);
}

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
  let key = { x: 0, y: 2 };
  const code: any[] = [];
  const numPad = [
    [null, null, "1", null, null],
    [null, "2", "3", "4", null],
    ["5", "6", "7", "8", "9"],
    [null, "A", "B", "C", null],
    [null, null, "D", null, null],
  ];
  for (const nextNumber of input) {
    for (const movement of nextNumber) {
      switch (movement) {
        case "R":
          if (key.x < 4) {
            key.x = key.x + 1;
          }
          if (numPad[key.y][key.x] === null) {
            key.x = key.x - 1;
          }
          break;
        case "L":
          if (key.x > 0) {
            key.x = key.x - 1;
          }
          if (numPad[key.y][key.x] === null) {
            key.x = key.x + 1;
          }
          break;
        case "U":
          if (key.y > 0) {
            key.y = key.y - 1;
          }
          if (numPad[key.y][key.x] === null) {
            key.y = key.y + 1;
          }
          break;
        case "D":
          if (key.y < 4) {
            key.y = key.y + 1;
          }
          if (numPad[key.y][key.x] === null) {
            key.y = key.y - 1;
          }
          break;
      }
    }
    code.push(numPad[key.y][key.x]);
  }

  console.log(`Part B: The bathroom code is actually: ${code}`);
}

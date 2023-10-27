import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const instructions = syncReadFile("./input.txt")
  .split("\n")
  .map((instruction) => instruction.split(" "));

type position = {
  x: number;
  y: number;
};
const allTailPositions: string[] = [];
// instructions:
// R -> x++
// L -> x--
// U -> y++
// D -> y--
function isTouching(headPos: position, tailPos: position) {
  return (
    Math.abs(headPos.x - tailPos.x) <= 1 && Math.abs(headPos.y - tailPos.y) <= 1
  );
}
function tailReact(tailPos: position, headPos: position) {
  if (isTouching(headPos, tailPos)) {
    allTailPositions.push(JSON.stringify(tailPos));
    return tailPos;
  } else {
    const xDiff = headPos.x - tailPos.x;
    const yDiff = headPos.y - tailPos.y;
    if (Math.abs(yDiff) > 0) {
      //move tail along y to catchup to head
      tailPos.y += yDiff > 0 ? 1 : -1;
    }
    if (Math.abs(xDiff) > 0) {
      //move tail along x to catchup with head
      tailPos.x += xDiff > 0 ? 1 : -1;
    }
    allTailPositions.push(JSON.stringify(tailPos));
    return tailPos;
  }
}
export default function partA(): void {
  let tailPos: position = { x: 0, y: 0 };
  let headPos: position = { x: 0, y: 0 };
  for (const instruction of instructions) {
    switch (instruction[0]) {
      case "R":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          headPos.x++;
          tailPos = tailReact(tailPos, headPos);
        }
        break;
      case "L":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          headPos.x--;
          tailPos = tailReact(tailPos, headPos);
        }
        break;
      case "U":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          headPos.y++;
          tailPos = tailReact(tailPos, headPos);
        }
        break;
      case "D":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          headPos.y--;
          tailPos = tailReact(tailPos, headPos);
        }
        break;
    }
  }
  console.log(
    `The tail occupied ${[...new Set(allTailPositions)].length} unique spots`
  );
}

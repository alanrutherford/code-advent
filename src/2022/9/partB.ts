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

function isTouching(headPos: position, tailPos: position) {
  return (
    Math.abs(headPos.x - tailPos.x) <= 1 && Math.abs(headPos.y - tailPos.y) <= 1
  );
}
function tailReact(headPos: position, tailPos: position) {
  if (isTouching(headPos, tailPos)) {
    // allTailPositions.push(JSON.stringify(tailPos));
    return tailPos;
  } else {
    const xDiff = headPos.x - tailPos.x;
    const yDiff = headPos.y - tailPos.y;
    if (Math.abs(yDiff) > 0) {
      tailPos.y += yDiff > 0 ? 1 : -1;
    }
    if (Math.abs(xDiff) > 0) {
      tailPos.x += xDiff > 0 ? 1 : -1;
    }
    return tailPos;
  }
}

function knotsReact(knot: position[]) {
  for (let i = 1; i < knot.length; i++) {
    knot[i] = JSON.parse(JSON.stringify(tailReact(knot[i - 1], knot[i])));
  }

  allTailPositions.push(JSON.stringify(knot[knot.length - 1]));
  return knot;
}
export default async function partB(): Promise<void> {
  const numKnots = 9;
  let knotPositions: position[] = new Array(numKnots + 1).fill(
    JSON.parse(JSON.stringify({ x: 0, y: 0 }))
  );
  knotPositions = knotsReact(knotPositions);
  for (const instruction of instructions) {
    switch (instruction[0]) {
      case "R":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          knotPositions[0].x++;
          knotPositions = knotsReact(knotPositions);
        }
        break;
      case "L":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          knotPositions[0].x--;
          knotPositions = knotsReact(knotPositions);
        }
        break;
      case "U":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          knotPositions[0].y++;
          knotPositions = knotsReact(knotPositions);
        }
        break;
      case "D":
        for (let step = 0; step < parseInt(instruction[1]); step++) {
          knotPositions[0].y--;
          knotPositions = knotsReact(knotPositions);
        }
        break;
    }
  }

  console.log(
    `The long tail occupied ${
      [...new Set(allTailPositions)].length
    } unique spots`
  );
}

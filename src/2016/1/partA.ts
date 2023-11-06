import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
enum directions {
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
}
enum move {
  "R",
  "L",
}
const pivot = (currentDirection: directions, movement: move) => {
  let returnValue: directions;
  switch (currentDirection) {
    case directions.NORTH:
      if (movement === move.R) {
        returnValue = directions.EAST;
      } else {
        returnValue = directions.WEST;
      }
      break;
    case directions.EAST:
      if (movement === move.R) {
        returnValue = directions.SOUTH;
      } else {
        returnValue = directions.NORTH;
      }
      break;
    case directions.SOUTH:
      if (movement === move.R) {
        returnValue = directions.WEST;
      } else {
        returnValue = directions.EAST;
      }
      break;
    case directions.WEST:
      if (movement === move.R) {
        returnValue = directions.NORTH;
      } else {
        returnValue = directions.SOUTH;
      }
      break;
  }
  return returnValue;
};
interface Movement {
  pivot: move;
  translation: number;
}

export default function partA(): void {
  let movements: Movement[] = [];
  syncReadFile("./input.txt")
    .split(", ")
    .forEach((set) => {
      movements.push({
        pivot: set.substring(0, 1) === move[0] ? move.R : move.L,
        translation: parseInt(set.substring(1, set.length)),
      });
    });
  let position = { x: 0, y: 0 };
  let direction = directions.NORTH;
  for (const movement of movements) {
    let newDirection: string = directions[pivot(direction, movement.pivot)];
    direction = newDirection as directions;
    switch (direction) {
      case directions.NORTH:
        position.y += movement.translation;
        break;
      case directions.SOUTH:
        position.y -= movement.translation;
        break;
      case directions.EAST:
        position.x += movement.translation;
        break;
      case directions.WEST:
        position.x -= movement.translation;
        break;
    }
  }
  console.log(`Part A: Bunny HQ is ${position.x + position.y} blocks away`);
}

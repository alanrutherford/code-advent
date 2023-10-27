import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  const directions = syncReadFile("./input.txt").split("");

  let housesDeliveredTo = new Set<string>();
  let xSantaPos = 0;
  let ySantaPos = 0;
  let xRoboPos = 0;
  let yRoboPos = 0;
  housesDeliveredTo.add(`x:${xSantaPos}y:${ySantaPos}`);
  for (let i = 0; i < directions.length; i += 2) {
    switch (directions[i]) {
      case "<":
        xSantaPos--;
        break;
      case ">":
        xSantaPos++;
        break;
      case "^":
        ySantaPos++;
        break;
      case "v":
        ySantaPos--;
        break;
    }

    if (!housesDeliveredTo.has(`x:${xSantaPos}y:${ySantaPos}`)) {
      housesDeliveredTo.add(`x:${xSantaPos}y:${ySantaPos}`);
    }

    switch (directions[i + 1]) {
      case "<":
        xRoboPos--;
        break;
      case ">":
        xRoboPos++;
        break;
      case "^":
        yRoboPos++;
        break;
      case "v":
        yRoboPos--;
        break;
    }

    if (!housesDeliveredTo.has(`x:${xRoboPos}y:${yRoboPos}`)) {
      housesDeliveredTo.add(`x:${xRoboPos}y:${yRoboPos}`);
    }
  }
  console.log(
    `Part B: There was ${housesDeliveredTo.size} houses delivered to`
  );
}

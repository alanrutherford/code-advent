import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
interface Value {
  [key: string]: number;
}

const getRoutes = (inputArr: string[]) => {
  let result: string[][] = [];

  const permute = (arr: string[], m: string[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

let directions: Value = {};
const destinations: Set<string> = new Set();
const calculateDistance = (route: string[]) => {
  let runningDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    runningDistance += directions[`${route[i]}${route[i + 1]}`];
  }
  return runningDistance;
};

syncReadFile("./input.txt")
  .split("\n")
  .forEach((distanceString) => {
    const [fromTo, distance] = distanceString.split("=");
    const [from, to] = fromTo.split("to");
    destinations.add(from.trim());
    destinations.add(to.trim());
    directions[`${from.trim()}${to.trim()}`] = parseInt(distance);
    directions[`${to.trim()}${from.trim()}`] = parseInt(distance);
  });
const possibleRoutes = getRoutes(Array.from(destinations));
let smallestRouteDistance = calculateDistance(possibleRoutes[0]);
let longestRouteDistance = smallestRouteDistance;
for (let i = 1; i < possibleRoutes.length; i++) {
  const distance = calculateDistance(possibleRoutes[i]);
  if (distance < smallestRouteDistance) {
    smallestRouteDistance = distance;
  }
  if (distance > longestRouteDistance) {
    longestRouteDistance = distance;
  }
}

console.log(`Part A: The smallest Route is ${smallestRouteDistance} kms`);
console.log(`Part B: The longest Route is ${longestRouteDistance} kms`);

import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const orders = syncReadFile("./input.txt")
  .split("\n")
  .map((order) => order.split("x").map((dimension) => parseInt(dimension)));

const areas = orders.map((order) => {
  //2*l*w + 2*w*h + 2*h*l
  const wl = 2 * order[0] * order[1];
  const wh = 2 * order[1] * order[2];
  const lh = 2 * order[2] * order[0];
  const extra = Math.min(wl / 2, wh / 2, lh / 2);
  return wl + wh + lh + extra;
});

const lengths = orders.map((order) => {
  const volume = order[0] * order[1] * order[2];
  const largestSide = Math.max(order[0], order[1], order[2]);
  const arr = [order[0], order[1], order[2]];
  arr.splice(arr.indexOf(largestSide), 1);
  const shortestDistance = 2 * (arr[0] + arr[1]);
  return shortestDistance + volume;
});
const totalArea = areas.reduce((a, b) => a + b);
const totalLength = lengths.reduce((a, b) => a + b);
console.log(`Part A: Total area needed is ${totalArea} square feet`);
console.log(`Part B: Total length needed is ${totalLength} feet`);

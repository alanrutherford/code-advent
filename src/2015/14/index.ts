import { readFileSync } from "fs";
import { join } from "path";
const RACE_TIME_LENGTH = 2503;
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
interface ReindeerStat {
  [key: string]: { speed: number; restPeriod: number; stamina: number };
}
interface ReindeerPerformance {
  [key: string]: {
    distanceTravelled: number;
    staminaRemaining: number;
    restRemaining: number;
    points: number;
  };
}
let reindeerStats: ReindeerStat = {};
let reindeerPerformance: ReindeerPerformance = {};

syncReadFile("./input.txt")
  .split("\n")
  .map((reindeerStat) => {
    const breakDown = reindeerStat.split(" ");
    reindeerStats[breakDown[0]] = {
      speed: parseInt(breakDown[3]),
      stamina: parseInt(breakDown[6]),
      restPeriod: parseInt(breakDown[13]),
    };
    reindeerPerformance[breakDown[0]] = {
      distanceTravelled: 0,
      staminaRemaining: parseInt(breakDown[6]),
      restRemaining: parseInt(breakDown[13]),
      points: 0,
    };
  });

for (let i = 1; i < RACE_TIME_LENGTH; i++) {
  let leadingDistance = 0;
  for (const reindeer in reindeerStats) {
    if (
      reindeerPerformance[reindeer].staminaRemaining > 0 &&
      reindeerPerformance[reindeer].restRemaining ===
        reindeerStats[reindeer].restPeriod
    ) {
      reindeerPerformance[reindeer].distanceTravelled +=
        reindeerStats[reindeer].speed;
      reindeerPerformance[reindeer].staminaRemaining =
        reindeerPerformance[reindeer].staminaRemaining - 1;
    } else if (
      reindeerPerformance[reindeer].staminaRemaining === 0 &&
      reindeerPerformance[reindeer].restRemaining <=
        reindeerStats[reindeer].restPeriod &&
      reindeerPerformance[reindeer].restRemaining > 0
    ) {
      reindeerPerformance[reindeer].restRemaining =
        reindeerPerformance[reindeer].restRemaining - 1;
    } else if (
      reindeerPerformance[reindeer].staminaRemaining === 0 &&
      reindeerPerformance[reindeer].restRemaining === 0
    ) {
      reindeerPerformance[reindeer].distanceTravelled +=
        reindeerStats[reindeer].speed;
      reindeerPerformance[reindeer].staminaRemaining =
        reindeerStats[reindeer].stamina - 1;
      reindeerPerformance[reindeer].restRemaining =
        reindeerStats[reindeer].restPeriod;
    }
    if (reindeerPerformance[reindeer].distanceTravelled > leadingDistance) {
      leadingDistance = reindeerPerformance[reindeer].distanceTravelled;
    }
  }
  for (const reindeer in reindeerStats) {
    if (reindeerPerformance[reindeer].distanceTravelled === leadingDistance) {
      reindeerPerformance[reindeer].points =
        reindeerPerformance[reindeer].points + 1;
    }
  }
}

let greatestDistance = 0;
let mostPoints = 0;

for (const reindeer in reindeerStats) {
  if (reindeerPerformance[reindeer].distanceTravelled > greatestDistance) {
    greatestDistance = reindeerPerformance[reindeer].distanceTravelled;
  }
  if (reindeerPerformance[reindeer].points > mostPoints) {
    mostPoints = reindeerPerformance[reindeer].points;
  }
}
console.log(`Part A: The greatest distance travelled is: ${greatestDistance}`);
console.log(`Part B: The most points gained is: ${mostPoints}`);

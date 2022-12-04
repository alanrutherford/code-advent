import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const elvesCalories = syncReadFile("./input.txt");
const elvesArr = elvesCalories.split("\n\n");
const sumArray: number[] = elvesArr.map((elf) => {
  const elfCaloriesSum = elf
    .split("\n")
    .reduce((sum, current) => sum + parseInt(current), 0);
  return elfCaloriesSum;
});

sumArray.sort((n1, n2) => n2 - n1);

console.log(`The max calorie count is ${sumArray[0]}`);
console.log(
  `The top three calories summed is: ${sumArray[0] + sumArray[1] + sumArray[2]}`
);

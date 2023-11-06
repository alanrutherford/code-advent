import { readFileSync } from "fs";
import { join } from "path";
import { text } from "stream/consumers";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

interface Ingredient {
  [key: string]: {
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
    calories: number;
  };
}
let ingredients: Ingredient = {};
const calculateScore = (perm: number[], maxCalories: number = 0) => {
  let capacity = 0;
  let durability = 0;
  let flavor = 0;
  let texture = 0;
  let calories = 0;
  let i = 0;
  for (const ingredient in ingredients) {
    capacity += perm[i] * ingredients[ingredient].capacity;
    durability += perm[i] * ingredients[ingredient].durability;
    flavor += perm[i] * ingredients[ingredient].flavor;
    texture += perm[i] * ingredients[ingredient].texture;
    calories += perm[i] * ingredients[ingredient].calories;
    i++;
  }
  if (capacity <= 0 || flavor <= 0 || texture <= 0 || durability <= 0) {
    return 0;
  }
  if (maxCalories > 0) {
    if (calories !== maxCalories) return 0;
  }
  return capacity * durability * flavor * texture;
};
const ingredientsPerms: number[][] = [];
syncReadFile("./input.txt")
  .split("\n")
  .forEach((ingredient) => {
    const breakDown = ingredient.split(" ");
    ingredients[breakDown[0].replace(":", "")] = {
      capacity: parseInt(breakDown[2].replace(",", "")),
      durability: parseInt(breakDown[4].replace(",", "")),
      flavor: parseInt(breakDown[6].replace(",", "")),
      texture: parseInt(breakDown[8].replace(",", "")),
      calories: parseInt(breakDown[10].replace(",", "")),
    };
  });
for (let a = 1; a <= 97; a++) {
  for (let b = 1; b <= 97; b++) {
    for (let c = 1; c <= 97; c++) {
      let d = 100 - a - b - c;
      if (d > 0) {
        ingredientsPerms.push([a, b, c, d]);
      }
    }
  }
}
let highestScore = 0;
let calorieRestrainedTopScore = 0;
console.log(ingredientsPerms.length);
for (const perm of ingredientsPerms) {
  let score = calculateScore(perm);
  let calorieRestrainedScore = calculateScore(perm, 500);
  if (score > highestScore) {
    highestScore = score;
  }
  if (calorieRestrainedScore > calorieRestrainedTopScore) {
    calorieRestrainedTopScore = calorieRestrainedScore;
  }
}
console.log(`Part A: Highest score is: ${highestScore}`);
console.log(
  `Part B: Highest score with a caloric restriction is: ${calorieRestrainedTopScore}`
);

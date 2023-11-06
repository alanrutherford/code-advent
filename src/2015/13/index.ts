import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
interface Value {
  [key: string]: number;
}
let happinessDeltas: Value = {};
const getArrangements = (inputArr: string[]) => {
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
const calculateHappiness = (arrangement: string[]) => {
  let happiness = 0;
  for (let i = 0; i < arrangement.length; i++) {
    let personA, personLeft, personRight;
    if (i === 0) {
      personA = arrangement[i];
      personLeft = arrangement[arrangement.length - 1];
      personRight = arrangement[i + 1];
    } else if (i === arrangement.length - 1) {
      personA = arrangement[i];
      personLeft = arrangement[i - 1];
      personRight = arrangement[0];
    } else {
      personA = arrangement[i];
      personLeft = arrangement[i - 1];
      personRight = arrangement[i + 1];
    }
    happiness += happinessDeltas[`${personA}${personLeft}`];
    happiness += happinessDeltas[`${personA}${personRight}`];
  }
  return happiness;
};

const guests: Set<string> = new Set();

syncReadFile("./input.txt")
  .split("\n")
  .forEach((singularHappinessStat) => {
    const breakDown = singularHappinessStat.split(" ");
    const personA = breakDown[0];
    const personB = breakDown[10].replace(".", "");
    const isGain = breakDown[2] === "gain";
    const happinessAmount = parseInt(breakDown[3]);
    happinessDeltas[`${personA}${personB}`] = isGain
      ? happinessAmount
      : -happinessAmount;
    guests.add(personA);
  });
const arrangements = getArrangements(Array.from(guests));
let happiness = 0;
arrangements.forEach((arrangement) => {
  const netHappiness = calculateHappiness(arrangement);
  if (netHappiness > happiness) {
    happiness = netHappiness;
  }
});

const me = "Alan";
guests.forEach((guest) => {
  happinessDeltas[`${me}${guest}`] = 0;
  happinessDeltas[`${guest}${me}`] = 0;
});
guests.add("Alan");
const newArrangements = getArrangements(Array.from(guests));
let newHappiness = 0;
newArrangements.forEach((arrangement) => {
  const netHappiness = calculateHappiness(arrangement);
  if (netHappiness > newHappiness) {
    newHappiness = netHappiness;
  }
});

console.log(`Part A: The ultimate happiness level is: ${happiness}`);
console.log(`Part B: The ultimate happiness level with me is: ${newHappiness}`);

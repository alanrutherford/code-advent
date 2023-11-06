import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const goodAuntSue: any = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};
interface AuntSue {
  [key: number]: any;
}
let aunts: AuntSue = {};
const checkAunt = (aunt: AuntSue) => {
  let sameProps = 0;
  for (const property in aunt) {
    if (aunt[property] === goodAuntSue[property]) {
      sameProps++;
    }
  }
  return sameProps === 3;
};
const checkAuntPrecisely = (aunt: AuntSue) => {
  let sameProps = 0;
  for (const property in aunt) {
    switch (property) {
      case "cats":
        if (aunt[property] > goodAuntSue[property]) {
          sameProps++;
        }
        break;
      case "trees":
        if (aunt[property] > goodAuntSue[property]) {
          sameProps++;
        }
        break;
      case "pomeranians":
        if (aunt[property] < goodAuntSue[property]) {
          sameProps++;
        }
        break;
      case "goldfish":
        if (aunt[property] < goodAuntSue[property]) {
          sameProps++;
        }
        break;
      default:
        if (aunt[property] === goodAuntSue[property]) {
          sameProps++;
        }
        break;
    }
  }
  return sameProps === 3;
};
syncReadFile("./input.txt")
  .split("\n")
  .forEach((aunt) => {
    let newAunt: any = {};
    const breakDown = aunt.split(" ");
    const thing = breakDown[2].replace(":", "");
    const thingValue = parseInt(breakDown[3].replace(",", ""));
    const thing2 = breakDown[4].replace(":", "");
    const thing2Value = parseInt(breakDown[5].replace(",", ""));
    const thing3 = breakDown[6].replace(":", "");
    const thing3Value = parseInt(breakDown[7].replace(",", ""));
    newAunt[`${thing}`] = thingValue;
    newAunt[`${thing2}`] = thing2Value;
    newAunt[`${thing3}`] = thing3Value;
    aunts[parseInt(breakDown[1].replace(":", ""))] = newAunt;
  });
let goodAuntIndex = 0;
let morePreciseGoodAuntIndex = 0;
for (const aunt in aunts) {
  if (checkAunt(aunts[aunt])) {
    goodAuntIndex = parseInt(aunt);
    break;
  }
}
for (const aunt in aunts) {
  if (checkAuntPrecisely(aunts[aunt])) {
    morePreciseGoodAuntIndex = parseInt(aunt);
    break;
  }
}
console.log(`Part A: The good aunt is ${goodAuntIndex}`);
console.log(
  `Part B: The more precise good aunt is ${morePreciseGoodAuntIndex}`
);

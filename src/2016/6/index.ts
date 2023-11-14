import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const messages = syncReadFile("./input.txt").split("\n");
const cleanedUpMessage: string[] = [];
const evenMoreCleanedUpMessage: string[] = [];
const messageLength = messages[0].length;
for (let i = 0; i < messageLength; i++) {
  const letterCountArr = [];
  const lettersCount: any = {};
  for (let j = 0; j < messages.length; j++) {
    const character = messages[j].charAt(i);
    lettersCount[character] = (lettersCount[character] || 0) + 1;
  }
  for (const letterCount in lettersCount) {
    letterCountArr.push([letterCount, lettersCount[letterCount]]);
  }
  letterCountArr.sort((a, b) => b[1] - a[1]);
  cleanedUpMessage.push(letterCountArr[0][0]);
  evenMoreCleanedUpMessage.push(letterCountArr[letterCountArr.length - 1][0]);
}
console.log(`Part A: cleaned up code is: ${cleanedUpMessage.join("")}`);
console.log(`Part B: cleaned up code is: ${evenMoreCleanedUpMessage.join("")}`);

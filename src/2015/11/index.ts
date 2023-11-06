import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const validatePassword = (password: string) => {
  const hasDoubleLettersRequirement =
    [...password.matchAll(/(\w)\1{1}/g)].length > 1;
  if (!hasDoubleLettersRequirement) {
    return false;
  }
  let hasIncrementingLettersRequirement = false;
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password.charCodeAt(i) + 1 === password.charCodeAt(i + 1) &&
      password.charCodeAt(i + 1) + 1 === password.charCodeAt(i + 2)
    ) {
      hasIncrementingLettersRequirement = true;
      break;
    }
  }
  if (!hasIncrementingLettersRequirement) {
    return false;
  }
  const blackList = ["i", "o", "l"];
  let containsBlacklistedLetters =
    blackList
      .map((blackChar) => password.split("").includes(blackChar))
      .filter((value) => value).length > 0;

  if (containsBlacklistedLetters) {
    return false;
  }

  return true;
};
const incrementPassword = (oldPassword: string, digit: number): string => {
  const radix = "z".charCodeAt(0);
  if (digit >= oldPassword.length) {
    return new Array(digit).fill("a").join("");
  }
  let newEndDigit = oldPassword.charCodeAt(oldPassword.length - digit) + 1;

  if (newEndDigit > radix) {
    newEndDigit = "a".charCodeAt(0);

    return incrementPassword(
      oldPassword.substring(0, oldPassword.length - digit) +
        String.fromCharCode(newEndDigit) +
        oldPassword.substring(oldPassword.length - digit + 1),
      digit + 1
    ) as string;
  }
  return (
    oldPassword.substring(0, oldPassword.length - digit) +
    String.fromCharCode(newEndDigit) +
    oldPassword.substring(oldPassword.length - digit + 1)
  );
};
const originalPassword = syncReadFile("./input.txt");
let isNewValidPassword = false;
let isNewNewValidPassword = false;
let potentialPassword = originalPassword;
while (!isNewValidPassword) {
  potentialPassword = incrementPassword(potentialPassword, 1);
  if (validatePassword(potentialPassword)) {
    isNewValidPassword = true;
  }
}
let newPotentialPassword = incrementPassword(potentialPassword, 1);
while (!isNewNewValidPassword) {
  newPotentialPassword = incrementPassword(newPotentialPassword, 1);
  if (validatePassword(newPotentialPassword)) {
    isNewNewValidPassword = true;
  }
}

console.log(`Part A: The next valid password is: ${potentialPassword} `);
console.log(`Part B: The next valid password is: ${newPotentialPassword} `);

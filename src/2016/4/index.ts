import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const isDecoy = (roomName: any) => {
  const lettersCount: any = {};
  //   input.forEach((x) => {
  //     multipleContainers[x] = (multipleContainers[x] || 0) + 1;
  //   });
  const encryptedName: string[] = roomName.encryptedName.split("");
  encryptedName.forEach((x) => {
    lettersCount[x] = (lettersCount[x] || 0) + 1;
  });
  const letterCountArr = [];
  for (const letterCount in lettersCount) {
    letterCountArr.push([letterCount, lettersCount[letterCount]]);
  }
  letterCountArr.sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0].charCodeAt(0) - b[0].charCodeAt(0);
    } else return b[1] - a[1];
  });

  return (
    letterCountArr
      .map((value) => value[0])
      .splice(0, 5)
      .join("") !== roomName.checkSum
  );
};
const decrypt = (encryptedName: String, sectorId: number) => {
  const encryptedNameArr = encryptedName.split("");
  for (let i = 0; i < encryptedNameArr.length; i++) {
    for (let j = 0; j < sectorId; j++) {
      if (encryptedNameArr[i] === "-") {
        encryptedNameArr[i] = " ";
        break;
      }
      if (encryptedNameArr[i] === "z") {
        encryptedNameArr[i] = "a";
      } else {
        const charCode = encryptedNameArr[i].charCodeAt(0);
        encryptedNameArr[i] = String.fromCharCode(charCode + 1);
      }
    }
  }
  return encryptedNameArr.join("");
};
const input = syncReadFile("./input.txt")
  .split("\n")
  .map((encryptedKey) => {
    const [firstPart, checkSum] = encryptedKey.replace("]", "").split("[");
    const encryptedName = firstPart.split("-");
    const encrptedNameWithDash = firstPart.substring(0, firstPart.length - 4);
    const sectorId = encryptedName.pop() || "";
    return {
      encryptedName: encryptedName.join(""),
      sectorId: parseInt(sectorId),
      checkSum,
      encrptedNameWithDash,
    };
  });
let runningSectorId = 0;
for (const roomName of input) {
  if (!isDecoy(roomName) && roomName.sectorId) {
    runningSectorId += roomName.sectorId;
    const decryptedName = decrypt(
      roomName.encrptedNameWithDash,
      roomName.sectorId
    );
    if (decryptedName.includes("northpole"))
      console.log(`PartB: ${decryptedName} -> ${roomName.sectorId}`);
  }
}
console.log(`Part A:  sum of sectorIds is: ${runningSectorId}`);

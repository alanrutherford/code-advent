import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
function getStartMarker(buffer: string[], distinctChars: number) {
  for (let i = 0; i < buffer.length; i++) {
    const potentialHeader = buffer.slice(i, i + distinctChars);
    //console.log(potentialHeader);
    if (
      potentialHeader
        .map((value) => potentialHeader.filter((check) => check === value))
        .map((check) => check.length > 1)
        .filter((value) => value).length === 0
    ) {
      return i + distinctChars;
    }
  }
  return null;
}

const dataStreamBuffer = syncReadFile("./input.txt").split("");
console.log(`startOfPacket Marker is ${getStartMarker(dataStreamBuffer, 4)}`);
console.log(`startOfPacket Marker is ${getStartMarker(dataStreamBuffer, 14)}`);

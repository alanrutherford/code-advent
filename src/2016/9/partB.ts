import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  console.log("NOT COMPLETED");
  let sequence = syncReadFile("./input.txt");
  let i = 0;
  let foundLastCompression = false;
  while (!foundLastCompression) {
    let j = sequence.indexOf("(", i);
    let k = sequence.indexOf(")", j) + 1;
    if (j < 0 || k < 0) {
      break;
    }

    const [subsequentCharacters, repetition] = sequence
      .substring(j, k)
      .replace(")", "")
      .replace("(", "")
      .split("x")
      .map((value) => parseInt(value));

    const decompressedPortion = sequence
      .substring(k, k + subsequentCharacters)
      .repeat(repetition);

    sequence =
      sequence.slice(0, j) +
      decompressedPortion +
      sequence.slice(k + subsequentCharacters);
    //This takes a long time to run (longer than I have patience)
    i = j;
  }
  console.log(`Part B: ${sequence.length}, ${sequence.charAt(0)}`);
}

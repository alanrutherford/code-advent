import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

const newLookAndSaySequence = (sequence: string) => {
  const brokenUp = sequence.match(/(.)\1*/g);
  if (!brokenUp) return "";

  let newSequence = [];
  for (const chunk of brokenUp) {
    newSequence.push(`${chunk.length}${chunk.charAt(0)}`);
  }
  return newSequence.join("");
};

export default function partA(): void {
  const input = syncReadFile("./input.txt");
  let sequence = input;
  for (let i = 0; i < 40; i++) {
    sequence = newLookAndSaySequence(sequence);
  }

  console.log(
    `Part A: the length of Look and say for length 40 is: ${sequence.length} `
  );
}

import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const getOrderedStacks = (stacksInput: string) => {
  const stackLines = stacksInput.split("\n").reverse().splice(1);
  const numOfStacks = (stackLines[0].length + 1) / 4;
  let stacks: string[][] = new Array(numOfStacks).fill(null).map(() => []);

  for (let j = 0; j < stackLines.length; j++) {
    for (let i = 0; i < numOfStacks; i++) {
      if (stackLines[j].charAt(i * 4 + 1) != " ")
        stacks[i].push(stackLines[j].charAt(i * 4 + 1));
    }
  }
  return stacks;
};
const executeInstruction = (
  stacks: string[][],
  instruction: number[] | null
) => {
  if (!instruction) return;
  const [boxNum, from, to] = instruction;

  const boxesToMove = stacks[from - 1]
    .splice(stacks[from - 1].length - boxNum, stacks[from - 1].length)
    .reverse();

  stacks[to - 1].push(...boxesToMove);
};
export default function partA(): void {
  const [stacksInput, instructionsInput] =
    syncReadFile("./input.txt").split("\n\n");
  const stacks = getOrderedStacks(stacksInput);
  const instructions = instructionsInput
    .split("\n")
    .map((instruction) => {
      const parsedInstruction = instruction.match(/[0-9]+/g);
      if (parsedInstruction) {
        return parsedInstruction.map((step) => parseInt(step));
      } else return null;
    })
    .filter((instruction) => instruction !== null);

  instructions.forEach((instruction) =>
    executeInstruction(stacks, instruction)
  );
  const topBoxes = stacks.map((stack) => stack.pop()).join("");
  console.log(`Crane 9000: the top boxes are: ${topBoxes}`);
}

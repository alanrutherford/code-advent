import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
function NumberToUint32(x: number): number {
  return x >>> 0;
}
function NumberToUint16(x: number): number {
  return NumberToUint32(x) & 0xffff;
}
enum operation {
  OR = "OR",
  AND = "AND",
  RSHIFT = "RSHIFT",
  LSHIFT = "LSHIFT",
  NOT = "NOT",
  EQUAL = "EQUAL",
}
type instruction = {
  operation: operation;
  outputWire: string;
  inputOne: string;
  inputTwo?: string;
  value?: number;
};
interface Value {
  [key: string]: number;
}

export default function partA(): void {
  const instructions = syncReadFile("./input.txt")
    .split("\n")
    .map((instruction) => {
      if (instruction.includes(operation.AND)) {
        const [inputOne, inputTwo] = instruction
          .split("->")[0]
          .split(operation.AND);
        const outputWire = instruction.split("->")[1].trim();
        return {
          operation: operation.AND,
          inputOne: inputOne.trim(),
          inputTwo: inputTwo.trim(),
          outputWire,
        };
      } else if (instruction.includes(operation.OR)) {
        const [inputOne, inputTwo] = instruction
          .split("->")[0]
          .split(operation.OR);
        const outputWire = instruction.split("->")[1].trim();
        return {
          operation: operation.OR,
          inputOne: inputOne.trim(),
          inputTwo: inputTwo.trim(),
          outputWire,
        };
      } else if (instruction.includes(operation.RSHIFT)) {
        const [inputOne, value] = instruction
          .split("->")[0]
          .split(operation.RSHIFT);
        const outputWire = instruction.split("->")[1].trim();
        return {
          operation: operation.RSHIFT,
          inputOne: inputOne.trim(),
          value: parseInt(value),
          outputWire,
        };
      } else if (instruction.includes(operation.LSHIFT)) {
        const [inputOne, value] = instruction
          .split("->")[0]
          .split(operation.LSHIFT);
        const outputWire = instruction.split("->")[1].trim();
        return {
          operation: operation.LSHIFT,
          inputOne: inputOne.trim(),
          value: parseInt(value),
          outputWire,
        };
      } else if (instruction.includes(operation.NOT)) {
        const [inputOne, outputWire] = instruction
          .split(operation.NOT)[1]
          .split("->");
        return {
          operation: operation.NOT,
          inputOne: inputOne.trim(),
          outputWire: outputWire.trim(),
        };
      } else {
        const [value, outputWire] = instruction.split("->");
        return {
          operation: operation.EQUAL,
          value: value.trim(),
          outputWire: outputWire.trim(),
        };
      }
    });
  // let wireValues: Record<string, number>[] = [];

  let wireValues: Value = {};
  for (const instruction of instructions) {
    switch (instruction.operation) {
      case operation.EQUAL:
        if (instruction.value) {
          const input = isNaN(instruction.value as number)
            ? wireValues[instruction.value as string]
            : parseInt(instruction.value as string);
          console.log(`value: '${instruction.value}' is a number: ${input}`);
          console.log(wireValues[instruction.value as string]);
          wireValues[instruction.outputWire] = input;
        }
        break;
      case operation.AND:
        console.log(instruction);

        if (instruction.inputOne && instruction.inputTwo) {
          const input = isNaN(parseInt(instruction.inputOne))
            ? wireValues[instruction.inputOne as string]
            : parseInt(instruction.inputOne as string);
          console.log(wireValues[instruction.inputTwo]);
          wireValues[instruction.outputWire] = NumberToUint16(
            input & wireValues[instruction.inputTwo]
          );
        }
        break;
      case operation.NOT:
        if (instruction.inputOne) {
          wireValues[instruction.outputWire] = NumberToUint16(
            ~wireValues[instruction.inputOne]
          );
        }
        break;
      case operation.LSHIFT:
        if (instruction.value && instruction.inputOne) {
          wireValues[instruction.outputWire] = NumberToUint16(
            wireValues[instruction.inputOne] << instruction.value
          );
        }
        break;
      case operation.RSHIFT:
        if (instruction.value && instruction.inputOne) {
          wireValues[instruction.outputWire] = NumberToUint16(
            wireValues[instruction.inputOne] >> instruction.value
          );
        }
        break;
      case operation.OR:
        if (instruction.inputOne && instruction.inputTwo) {
          wireValues[instruction.outputWire] = NumberToUint16(
            wireValues[instruction.inputOne] | wireValues[instruction.inputTwo]
          );
        }
        break;
    }
  }
  console.log(wireValues);
  console.log(
    `Part A: The signal provided at wire A is: ${NumberToUint16(
      wireValues["a"]
    )}`
  );
}

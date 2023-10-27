import { readFileSync } from "fs";
import test from "node:test";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

enum arithmeticOperation {
  DIVISION = "DIVISION",
  MULTIPLICATION = "MULTIPLICATION",
  ADDITION = "ADDITION",
  SUBTRACTION = "SUBTRACTION",
}

type operation = {
  rawValue: string;
  firstValue: number;
  operation: string;
  secondValue: number;
};

type monkeyInfo = {
  index: number;
  items: number[];
  operation: operation;
  test: number;
  trueResult: number;
  falseResult: number;
  inpections: number;
};

function parseOperation(operation: string): operation {
  const rawValue = operation;
  const [, firstValue, operationSymbol, secondValue] = operation
    .split("=")[1]
    .split(" ");

  return {
    rawValue,
    firstValue: parseInt(firstValue),
    operation: operationSymbol,
    secondValue: parseInt(secondValue),
  };
}
export default function partB(): void {
  const monkeyData = syncReadFile("./input.txt")
    .split("\n\n")
    .map((monkeyInfo) => monkeyInfo.split("\n"));
  const monkeyInput: monkeyInfo[] = monkeyData.map((data) => {
    return {
      index: parseInt(data[0].split("Monkey ")[1]),
      items: data[1]
        .split(": ")[1]
        .split(", ")
        .map((item) => parseInt(item)),
      operation: parseOperation(data[2]),
      test: parseInt(data[3].split("Test: divisible by ")[1]),
      trueResult: parseInt(data[4].split("    If true: throw to monkey ")[1]),
      falseResult: parseInt(data[5].split("    If false: throw to monkey ")[1]),
      inpections: 0,
    };
  });

  function operation(operation: operation, value: number) {
    let first = isNaN(operation.firstValue) ? value : operation.firstValue;
    let second = isNaN(operation.secondValue) ? value : operation.secondValue;
    switch (operation.operation) {
      case "+":
        value = first + second;
        break;
      case "*":
        value = first * second;
        break;
      case "/":
        value = first / second;
        break;
      case "-":
        value = first - second;
        break;
    }
    return value;
  }
  function test(test: number, value: number) {
    while (value > modulo) {
      value -= modulo;
    }
    return value % test === 0;
  }
  function round(monkeys: monkeyInfo[]) {
    for (const monkey of monkeys) {
      turn(monkey);
    }
  }
  function turn(monkey: monkeyInfo) {
    for (const item of monkey.items) {
      let worryLevel = operation(monkey.operation, item);

      if (worryLevel > modulo) {
        worryLevel -= Math.floor(worryLevel / modulo) * modulo;
      }
      if (test(monkey.test, worryLevel)) {
        monkeyInput[monkey.trueResult].items.push(worryLevel);
      } else {
        monkeyInput[monkey.falseResult].items.push(worryLevel);
      }
      monkey.inpections++;
    }
    monkey.items = [];
  }
  const ROUNDS = 10000;
  const modulo = monkeyInput
    .map((monkey) => monkey.test)
    .reduce((sum, current) => sum * current, 1);
  for (let i = 0; i < ROUNDS; i++) {
    round(monkeyInput);
  }

  const inspections = monkeyInput
    .map((monkey) => monkey.inpections)
    .sort((n1, n2) => n2 - n1);

  console.log(`B: Monkey business is: ${inspections[0] * inspections[1]}`);
}

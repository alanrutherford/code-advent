import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

interface Directory {
  name: string;
  size: number;
  children: string[];
  path: string[];
}

const MAX_DIR_SIZE = 100000;
const TOTAL_DISK_SIZE = 70000000;
const TARGET_UNUSED_SPACE = 30000000;
const TARGET_SIZE = TOTAL_DISK_SIZE - TARGET_UNUSED_SPACE;

const commands = syncReadFile("./input.txt").split("\n");
let path: string[] = [];
const directories: Record<string, Directory> = {};

function getSize(directory: string): number {
  const childrenNames = directories[directory].children.map((name) =>
    [directory, name].join(",")
  );
  if (childrenNames.length === 0) return directories[directory].size;
  else {
    return childrenNames
      .map((child) => getSize(child))
      .reduce((sum, current) => sum + current, directories[directory].size);
  }
}

commands.forEach((command) => {
  if (command.includes("$ cd")) {
    if (!command.includes("..")) {
      const [, , name] = command.split(" ");
      path.push(name);

      directories[JSON.parse(JSON.stringify(path))] = {
        name: name,
        size: 0,
        children: [],
        path: JSON.parse(JSON.stringify(path)),
      };
    } else {
      path.pop();
    }
  } else if (!command.includes("$")) {
    if (command.includes("dir")) {
      const [, childName] = command.split(" ");
      directories[JSON.parse(JSON.stringify(path))].children.push(childName);
    } else {
      const [size] = command.split(" ");
      directories[JSON.parse(JSON.stringify(path))].size += parseInt(size);
    }
  }
});

console.log(
  `Sum of size of directories with size less than or equal to 100000: ${Object.entries(
    directories
  )
    .map((directory) => {
      const size = getSize(directory[0]);
      if (size <= MAX_DIR_SIZE) {
        return size;
      }
      return 0;
    })
    .reduce((sum, current) => sum + current, 0)}`
);
const rootSize = getSize("/");
console.log(
  `Directory to delete to make enough room is of size: ${
    Object.entries(directories)
      .map((directory) => {
        const size = getSize(directory[0]);

        if (size >= rootSize - TARGET_SIZE) {
          return size;
        }
        return 0;
      })
      .filter((size) => size > 0)
      .sort((a, b) => a - b)[0]
  }`
);

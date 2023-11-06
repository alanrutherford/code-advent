import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const triangles = syncReadFile("./input.txt")
    .split("\n")
    .map((triangle) =>
      triangle
        .split(" ")
        .filter((point) => point != "")
        .map((point) => parseInt(point))
    );
  let markedTriangles = 0;
  for (const triangle of triangles) {
    if (
      triangle[0] + triangle[1] > triangle[2] &&
      triangle[1] + triangle[2] > triangle[0] &&
      triangle[2] + triangle[0] > triangle[1]
    ) {
      markedTriangles = markedTriangles + 1;
    }
    // console.log(triangle);
  }
  console.log(`Part A: Valid triangles: ${markedTriangles}`);
}

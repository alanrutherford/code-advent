import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  const triangles = syncReadFile("./input.txt")
    .split("\n")
    .map((triangle) =>
      triangle
        .split(" ")
        .filter((point) => point != "")
        .map((point) => parseInt(point))
    );
  let markedTriangles = 0;
  for (let i = 0; i < triangles.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      if (
        triangles[i][j] + triangles[i + 1][j] > triangles[i + 2][j] &&
        triangles[i + 1][j] + triangles[i + 2][j] > triangles[i][j] &&
        triangles[i + 2][j] + triangles[i][j] > triangles[i + 1][j]
      ) {
        markedTriangles = markedTriangles + 1;
      }
    }
  }
  console.log(`Part B: Vertically ordered valid triangles: ${markedTriangles}`);
}

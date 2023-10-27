import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  let rounds = syncReadFile("./input.txt")
    .split("\n")
    .map((round) => round.split(" "));

  // A = X = Rock;
  // B = Y = Paper;
  // C = Z = Scissors;
  // 1 point for Rock
  // 2 points for Paper
  // 3 points for Scissors
  // 0 points for loss
  // 3 points for draw
  // 6 points for win

  const pointsPerRound = rounds.map((round) => {
    let points = 0;
    const opponentMove = round[0];
    switch (round[1]) {
      case "X": // Play Rock
        points += 1;
        if (opponentMove === "C") {
          points += 6; //Win
        } else if (opponentMove === "A") {
          points += 3; //Draw
        }
        break;
      case "Y": // Play Paper
        points += 2;
        if (opponentMove === "A") {
          points += 6; //Win
        } else if (opponentMove === "B") {
          points += 3; //Draw
        }
        break;
      case "Z": // Play Scissors
        points += 3;
        if (opponentMove === "B") {
          points += 6; //Win
        } else if (opponentMove === "C") {
          points += 3; //Draw
        }
        break;
    }
    return points;
  });

  console.log(
    `Part A: Total score: ${pointsPerRound.reduce(
      (sum, current) => sum + current,
      0
    )}`
  );
}

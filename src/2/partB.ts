import { readFileSync } from "fs";
import { join } from "path";

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  let rounds = syncReadFile("./input.txt")
    .split("\n")
    .map((round) => round.split(" "));

  // A = Rock;
  // B = Paper;
  // C = Scissors;
  // X = Loss
  // Y = Draw
  // Z = Win
  // 1 point for Rock
  // 2 points for Paper
  // 3 points for Scissors
  // 0 points for loss
  // 3 points for draw
  // 6 points for win

  const pointsPerRound = rounds.map((round) => {
    let points = 0;
    const result = round[1];
    switch (round[0]) {
      case "A": // Play Rock
        if (result === "Z") {
          points += 2; // points for playing paper
          points += 6; //Win
        } else if (result === "Y") {
          points += 1; //points for playing rock
          points += 3; //Draw
        } else if (result === "X") {
          points += 3; // points for playing scissors
          points += 0;
        }
        break;
      case "B": // Play Paper
        if (result === "Z") {
          points += 3; // points for playing scissors
          points += 6; //Win
        } else if (result === "Y") {
          points += 2; //points for playing paper
          points += 3; //Draw
        } else if (result === "X") {
          points += 1; // points for playing rock
          points += 0;
        }
        break;
      case "C": // Play Scissors
        if (result === "Z") {
          points += 1; // points for playing rock
          points += 6; //Win
        } else if (result === "Y") {
          points += 3; //points for playing scissors
          points += 3; //Draw
        } else if (result === "X") {
          points += 2; // points for playing paper
          points += 0;
        }
        break;
    }
    return points;
  });

  console.log(
    `Part B: Total score: ${pointsPerRound.reduce(
      (sum, current) => sum + current,
      0
    )}`
  );
}

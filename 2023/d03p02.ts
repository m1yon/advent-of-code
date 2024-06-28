import fs from "node:fs/promises";

async function main() {
  const matrix = await parseInput();

  const gears: Record<string, Array<number>> = {};

  const results: Array<number> = [];
  for (let row = 0; row < matrix.length; row++) {
    const currentRow = matrix[row] ?? "";
    let adjacentGears: Array<string> = [];
    let currentNumber: Array<string> = [];
    let valid = false;

    for (let col = 0; col < currentRow.length; col++) {
      const currentCharacter = matrix[row]?.[col];
      if (!isNumeric(currentCharacter)) continue;

      currentNumber.push(currentCharacter);

      forEachAdjacentTile({
        matrix,
        row,
        col,
        callback: (val, row, col) => {
          if (isSymbol(val)) {
            valid = true;
          }

          if (val === "*") {
            adjacentGears.push(`${row},${col}`);
          }
        },
      });

      const nextCharacter = matrix[row]?.[col + 1];

      if (!isNumeric(nextCharacter)) {
        const finalNumber = Number(currentNumber.join(""));

        if (valid) {
          results.push(finalNumber);
        }

        for (const coords of adjacentGears) {
          gears[coords] = [
            ...(gears[coords]?.filter((num) => num !== finalNumber) || []),
            finalNumber,
          ];
        }

        valid = false;
        currentNumber = [];
        adjacentGears = [];
      }
    }
  }

  const gearRatioSum = Object.keys(gears).reduce((acc, curr) => {
    const adjacentNumbers = gears[curr];
    if (!adjacentNumbers || adjacentNumbers?.length !== 2) return acc;

    const gearRatio = (adjacentNumbers?.[0] ?? 0) * (adjacentNumbers?.[1] ?? 0);

    return acc + gearRatio;
  }, 0);

  console.log("gearRatioSum", gearRatioSum);
}

function forEachAdjacentTile({
  matrix,
  row,
  col,
  callback,
}: {
  matrix: Array<string>;
  row: number;
  col: number;
  callback: (val: string | undefined, row: number, col: number) => void;
}) {
  callback(matrix[row - 1]?.[col], row - 1, col);
  callback(matrix[row - 1]?.[col + 1], row - 1, col + 1);
  callback(matrix[row]?.[col + 1], row, col + 1);
  callback(matrix[row + 1]?.[col + 1], row + 1, col + 1);
  callback(matrix[row + 1]?.[col], row + 1, col);
  callback(matrix[row + 1]?.[col - 1], row + 1, col - 1);
  callback(matrix[row]?.[col - 1], row, col - 1);
  callback(matrix[row - 1]?.[col - 1], row - 1, col - 1);
}

main();

async function parseInput() {
  const raw = await fs.readFile("input.txt", "utf8");
  const matrix = raw.trim().split("\n");
  return matrix;
}

function isSymbol(char?: string) {
  if (char === undefined) return false;
  if (char === ".") return false;

  const isNumerical = Number.isInteger(Number(char));
  return !isNumerical;
}

function isNumeric(char?: string): char is string {
  return Number.isInteger(Number(char));
}

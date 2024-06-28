import fs from "node:fs/promises";

async function main() {
  const matrix = await parseInput();

  const results: Array<number> = [];
  for (let row = 0; row < matrix.length; row++) {
    const currentRow = matrix[row] ?? "";
    let currentNumber: Array<string> = [];
    let valid = false;

    for (let col = 0; col < currentRow.length; col++) {
      const currentCharacter = matrix[row]?.[col];
      if (!isNumeric(currentCharacter)) continue;

      currentNumber.push(currentCharacter);

      if (isSymbol(matrix[row - 1]?.[col])) valid = true;
      if (isSymbol(matrix[row - 1]?.[col + 1])) valid = true;
      if (isSymbol(matrix[row]?.[col + 1])) valid = true;
      if (isSymbol(matrix[row + 1]?.[col + 1])) valid = true;
      if (isSymbol(matrix[row + 1]?.[col])) valid = true;
      if (isSymbol(matrix[row + 1]?.[col - 1])) valid = true;
      if (isSymbol(matrix[row]?.[col - 1])) valid = true;
      if (isSymbol(matrix[row - 1]?.[col - 1])) valid = true;

      const nextCharacter = matrix[row]?.[col + 1];

      if (!isNumeric(nextCharacter)) {
        if (valid) {
          results.push(Number(currentNumber.join("")));
        }

        valid = false;
        currentNumber = [];
      }
    }
  }

  const sum = results.reduce((acc, curr) => acc + curr, 0);

  console.log("sum", sum);
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

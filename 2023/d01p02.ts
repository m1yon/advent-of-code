import fs from "node:fs/promises";

const main = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  const inputLines = input.split("\n");

  const values = [];

  for (const line of inputLines) {
    if (line.length === 0) continue;

    let lo = 0;
    let hi = line.length - 1;

    let loNumber;
    let hiNumber;

    while (true) {
      loNumber = getNumberAtPosition(line, lo);

      if (loNumber !== null) {
        break;
      }

      lo++;
    }

    while (true) {
      hiNumber = getNumberAtPosition(line, hi);

      if (hiNumber !== null) {
        break;
      }

      hi--;
    }

    values.push(Number(`${loNumber}${hiNumber}`));
  }

  const total = values.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  console.log("total", total);
};

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getNumberAtPosition = (line: string, position: number): number | null => {
  if (Number.isInteger(Number(line[position]))) {
    return Number(line[position]);
  }

  const slice = line.slice(position);
  const index = numbers.findIndex((num) => slice.startsWith(num));
  if (index === -1) return null;
  return index + 1;
};

main();

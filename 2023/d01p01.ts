import fs from "node:fs/promises";

const main = async () => {
  const input = await fs.readFile("./input.txt", "utf8");
  const inputLines = input.split("\n");

  const values = [];

  for (const line of inputLines) {
    if (line.length === 0) continue;

    let lo = 0;
    let hi = line.length - 1;

    while (Number.isNaN(Number(line[lo]))) {
      lo++;
    }

    while (Number.isNaN(Number(line[hi]))) {
      hi--;
    }

    values.push(Number(`${line[lo]}${line[hi]}`));
  }

  const total = values.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  console.log("total", total);
};

main();

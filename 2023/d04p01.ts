import fs from "node:fs/promises";

async function main() {
  const cards = await parseInput();

  let points = 0;
  for (const card of cards) {
    let cardPoints = 0;
    for (const number of card.numbers) {
      if (!card.winningNumbers.has(number)) continue;

      if (cardPoints === 0) {
        cardPoints++;
        continue;
      }

      cardPoints *= 2;
    }

    points += cardPoints;
  }

  console.log("points", points);
}

main();

async function parseInput() {
  const raw = await fs.readFile("./input.txt", "utf8");
  const lines = raw.trim().split("\n");

  const cards = lines.map((line) => {
    const [_, content] = line.split(": ");
    if (!content) return { winningNumbers: new Set<number>(), numbers: [] };
    const [winningNumbers, numbers] = content?.split(" | ");

    return {
      winningNumbers: new Set(
        winningNumbers?.split(" ").map(Number).filter(Boolean)
      ),
      numbers: numbers?.split(" ").map(Number).filter(Boolean) ?? [],
    };
  });

  return cards;
}

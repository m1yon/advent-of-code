import fs from "node:fs/promises";

async function main() {
  const cards = await parseInput();

  let copies = 0;
  const queue: Array<Card> = [...cards];

  while (queue.length) {
    const card = queue.pop();

    if (!card) continue;

    let wins = 0;
    for (const number of card.numbers) {
      if (!card.winningNumbers.has(number)) continue;

      const cardToPush = cards[card.id + wins + 1];
      if (cardToPush) queue.push(cardToPush);
      wins++;
    }

    copies++;
  }

  console.log("copies", copies);
}

main();

type Card = {
  id: number;
  winningNumbers: Set<number>;
  numbers: number[];
};

async function parseInput() {
  const raw = await fs.readFile("./input.txt", "utf8");
  const lines = raw.trim().split("\n");

  const cards = lines.map((line, index) => {
    const [_, content] = line.split(": ");
    if (!content)
      return { id: 0, winningNumbers: new Set<number>(), numbers: [] };
    const [winningNumbers, numbers] = content?.split(" | ");

    return {
      id: index,
      winningNumbers: new Set(
        winningNumbers?.split(" ").map(Number).filter(Boolean)
      ),
      numbers: numbers?.split(" ").map(Number).filter(Boolean) ?? [],
    };
  });

  return cards;
}

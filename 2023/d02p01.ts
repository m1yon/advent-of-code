import fs from "node:fs/promises";

interface Game {
  id: number;
  rounds: Array<Record<string, number>>;
}

const limits: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const games = await parseInput();
  const validGames = games.filter(isGameValid);

  const sum = validGames.reduce((acc, curr) => (acc += curr.id), 0);

  console.log("sum", sum);
}

function isGameValid(game: Game) {
  for (const round of game.rounds) {
    for (const color of Object.keys(round)) {
      const count = round[color];

      if (!count) continue;

      if (count > (limits[color] ?? 0)) {
        return false;
      }
    }
  }

  return true;
}

main();

async function parseInput(): Promise<Array<Game>> {
  const raw = await fs.readFile("input.txt", "utf8");

  const lines = raw.split("\n");

  const games = lines.map((line) => {
    const [game, content] = line.split(":");
    const gameID = Number(game?.replace("Game ", ""));

    const rounds =
      content?.split(";").map((round) => {
        const cubeColors = round.split(",");

        const cubeColorCounts = cubeColors.reduce<Record<string, number>>(
          (acc, curr) => {
            const [number, color] = curr.trim().split(" ");

            if (color) {
              acc[color] = Number(number);
            }

            return acc;
          },
          {
            red: 0,
            blue: 0,
            green: 0,
          }
        );

        return cubeColorCounts;
      }) || [];

    return {
      id: gameID,
      rounds,
    };
  });

  return games;
}

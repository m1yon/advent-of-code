import fs from "node:fs/promises";

interface Game {
  id: number;
  rounds: Array<Record<string, number>>;
}

async function main() {
  const games = await parseInput();

  const powers = games.map((game) => {
    const fewestNumberOfCubes = game.rounds.reduce<Record<string, number>>(
      (acc, round) => ({
        red: Math.max(acc.red ?? 0, round.red ?? 0),
        green: Math.max(acc.green ?? 0, round.green ?? 0),
        blue: Math.max(acc.blue ?? 0, round.blue ?? 0),
      }),
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );

    return (
      (fewestNumberOfCubes.red ?? 0) *
      (fewestNumberOfCubes.green ?? 0) *
      (fewestNumberOfCubes.blue ?? 0)
    );
  });

  const sum = powers.reduce((acc, curr) => (acc += curr), 0);

  console.log("sum", sum);
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

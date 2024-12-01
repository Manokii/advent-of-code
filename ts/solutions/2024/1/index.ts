import { AventOfCode, tyep Part } from "../../../lib/advent-of-code";

function getData(lines: string[]) {
	const data = lines.reduce<{ x: number[]; y: number[] }>(
		(acc, cur) => {
			const regex = /(\d+)\s+(\d+)/;
			const match = cur.match(regex);

			if (!match) {
				throw new Error(`Invalid input: ${cur}`);
			}

			const [_, x, y] = match.map(Number);

			if (isNaN(x) || isNaN(y)) {
				throw new Error(`Invalid input: ${cur}`);
			}

			acc.x.push(x);
			acc.y.push(y);
			return acc;
		},
		{ x: [], y: [] },
	);

	return data;
}

export default async function main() {
	const day1 = new AventOfCode(2024, 1);
	await day1.init();

	// Day 1 part 1 - get diff of sorted arrays
	day1.addSolution(Part.Part1, (lines) => {
		const data = getData(lines);
		const xSorted = data.x.sort((a, b) => a - b);
		const ySorted = data.y.sort((a, b) => a - b);
		let diff = 0;
		for (let i = 0; i < xSorted.length; i++) {
			diff += Math.abs(xSorted[i] - ySorted[i]);
		}
		return diff;
	});

	// Day 1 part 2 - get similarity score
	day1.addSolution(Part.Part2, (lines) => {
		const data = getData(lines);
		let similarityScore = 0;
		for (let i = 0; i < data.x.length; i++) {
			const x = data.x[i];
			const xInY = data.y.filter((y) => y === x).length;
			similarityScore += x * xInY;
		}
		return similarityScore;
	});

	day1.end();
}

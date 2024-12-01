import { AventOfCode, Part } from "../../../lib/advent-of-code";

function parseInput(lines: string[]) {
	const x: number[] = [];
	const y: number[] = [];

	for (const line of lines) {
		const regex = /(\d+)\s+(\d+)/;
		const match = line.match(regex) ?? [];
		const [_, left, right] = match.map(Number);
		if (left === undefined || right === undefined) {
			throw new Error(`Invalid input: ${line}`);
		}
		x.push(left);
		y.push(right);
	}

	return { x, y };
}

export default async function main() {
	const day1 = new AventOfCode(2024, 1);
	await day1.init();
	const parsedInput = parseInput(day1.input);

	day1.addSolution(Part.Part1, () => {
		const xSorted = parsedInput.x.sort((a, b) => a - b);
		const ySorted = parsedInput.y.sort((a, b) => a - b);
		let diff = 0;
		for (let i = 0; i < xSorted.length; i++) {
			diff += Math.abs(xSorted[i] - ySorted[i]);
		}
		return diff;
	});

	day1.addSolution(Part.Part2, () => {
		let similarityScore = 0;
		for (let i = 0; i < parsedInput.x.length; i++) {
			const x = parsedInput.x[i];
			const xInY = parsedInput.y.filter((y) => y === x).length;
			similarityScore += x * xInY;
		}
		return similarityScore;
	});

	day1.end();
}

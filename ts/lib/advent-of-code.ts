import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export enum Part {
	Part1 = "part1",
	Part2 = "part2",
}

export class AventOfCode {
	year: number;
	day: number;
	input: string[];
	input_sample: string[];
	part1_sample: unknown;
	part2_sample: unknown;
	part1: unknown;
	part2: unknown;
	#initialized = false;

	constructor(year: number, day: number) {
		this.year = year;
		this.day = day;
		this.input_sample = readFileSync(
			resolve(__dirname, `solutions/${year}/${this.day}/sample.txt`),
			"utf-8",
		)
			.trim()
			.split("\n");
	}

	async init() {
		const res = await fetch(
			`https://adventofcode.com/${this.year}/day/${this.day}/input`,
			{
				headers: { Cookie: `session=${process.env.SESSION}` },
				method: "GET",
			},
		);
		const text = await res.text();
		this.input = text.trim().split("\n");
		this.#initialized = true;
	}

	addSolution(part: Part, solution: (input: string[]) => unknown) {
		if (!this.#initialized) {
			throw new Error("You must call init() before adding solutions");
		}
		this[part] = solution(this.input);
		this[part + "_sample"] = solution(this.input_sample);
	}

	end() {
		console.log("------------------------");
		console.log(`${this.year}/${this.day}`);
		console.log("Part 1 (sample):", this.part1_sample);
		console.log("Part 2 (sample):", this.part2_sample);
		console.log("Part 1:", this.part1);
		console.log("Part 2:", this.part2);
	}
}

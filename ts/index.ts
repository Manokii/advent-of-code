import fs from "node:fs";

type LazyImportType = {
	default: () => Promise<void>;
};

async function main() {
	const dirs = fs.readdirSync("./solutions/", { recursive: true });
	const validFile = /^\d{4}\/\d+$/;
	const files = dirs.filter((dir): dir is string => {
		return typeof dir === "string" && validFile.test(dir);
	});

	console.log("Solutions found:");
	console.log(files.join("\n"));

	for (const file of files) {
		const path = `./solutions/${file}`;
		const { default: fn }: LazyImportType = await import(path);

		if (!fn) {
			throw new Error(`No default export in ${path}`);
		}

		await fn();
	}
}

main();

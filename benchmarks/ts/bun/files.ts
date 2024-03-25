import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const createBunFile = async (fileName: string, numberOfParagraphs: number) => {
	const file = Bun.file(fileName);
	const writer = file.writer();
	for (const line of faker.lorem.paragraphs(numberOfParagraphs)) {
		writer.write(line);
	}
	await writer.flush();
	return file;
};

const createBatchOfBunFiles = async (
	numberOfFiles: number,
	startFileName: string,
	numberOfParagraphs = 20,
	directory = "tmp"
) => {
	const startTime = performance.now();
	const fileNames = [];
	if (!fs.existsSync(path.join(import.meta.dir, directory).toString())) {
		fs.mkdirSync(path.join(import.meta.dir, directory));
	}
	for (let i = 0; i < numberOfFiles; i++) {
		const fileName = path.join(import.meta.dir, directory, `${startFileName}-${i + 1}.txt`).toString();
		await createBunFile(fileName, numberOfParagraphs);
		fileNames.push(fileName);
	}
	const endTime = performance.now();
	return { fileNames: fileNames, timeOfCreating: endTime - startTime };
};

const createFile = (fileName: string, numberOfParagraphs: number) => {
	return fs.writeFileSync(fileName, faker.lorem.paragraphs(numberOfParagraphs));
};

const createBatchOfFiles = (
	numberOfFiles: number,
	startFileName: string,
	numberOfParagraphs = 20,
	directory = "tmp"
) => {
	const startTime = performance.now();
	const fileNames = [];
	if (!fs.existsSync(path.join(import.meta.dir, directory).toString())) {
		fs.mkdirSync(path.join(import.meta.dir, directory));
	}
	for (let i = 0; i < numberOfFiles; i++) {
		const fileName = path.join(import.meta.dir, directory, `${startFileName}-${i + 1}.txt`).toString();
		createFile(fileName, numberOfParagraphs);
		fileNames.push(fileName);
	}
	const endTime = performance.now();
	return { fileNames: fileNames, timeOfCreating: endTime - startTime };
};

const readFiles = (fileNames: string[]) => {
	const resultOfWriting = [];
	const startTime = performance.now();

	for (const fileName of fileNames) {
		try {
			const realFileName = fileName
				.split("/")
				.filter((s) => s)
				.reverse()[0];
			const lines = fs.readFileSync(path.join(import.meta.dir, "tmp", realFileName).toString(), {
				encoding: "utf-8",
			});
			const content = lines.toString();
			resultOfWriting.push(content);
		} catch (err) {
			console.error(err);
		}
	}
	const endTime = performance.now();

	return { results: resultOfWriting, timeOfReading: endTime - startTime };
};

const readBunFiles = async (fileNames: string[]) => {
	const resultOfWriting = [];
	const startTime = performance.now();

	for (const fileName of fileNames) {
		try {
			const file = Bun.file(fileName);
			const lines = await file.text();
			resultOfWriting.push(lines);
		} catch (err) {
			console.error(err);
		}
	}
	const endTime = performance.now();

	return { results: resultOfWriting, timeOfReading: endTime - startTime };
};

const removeFiles = (directory = "tmp") => {
	fs.rmSync(path.join(import.meta.dir, directory), { recursive: true, force: true });
};

const performBenchmark = async (
	numberOfFiles: number,
	numberOfParagraphs: number,
	numberOfIterations: number,
	shouldBeBunFiles = false
) => {
	if (shouldBeBunFiles) {
		return await performBenchmarkBun(numberOfFiles, numberOfParagraphs, numberOfIterations);
	} else {
		return performBenchmarkFs(numberOfFiles, numberOfParagraphs, numberOfIterations);
	}
};

const performBenchmarkBun = async (
	numberOfFiles: number,
	numOfParagraphs: number,
	numberOfIterations: number,
	filePrefix = "lorem"
) => {
	const result = [];
	const startTime = performance.now();
	for (let i = 0; i < numberOfIterations; i++) {
		const { fileNames, timeOfCreating } = await createBatchOfBunFiles(numberOfFiles, filePrefix, numOfParagraphs);
		const { results, timeOfReading } = await readBunFiles(fileNames);
		result.push({ results, timeOfReading, timeOfCreating });
	}
	removeFiles();
	const endTime = performance.now();
	return { results: result, timeOfExecution: endTime - startTime };
};

const performBenchmarkFs = (
	numberOfFiles: number,
	numOfParagraphs: number,
	numberOfIterations: number,
	filePrefix = "lorem"
) => {
	const result = [];
	const startTime = performance.now();
	for (let i = 0; i < numberOfIterations; i++) {
		const { fileNames, timeOfCreating } = createBatchOfFiles(numberOfFiles, filePrefix, numOfParagraphs);
		const { results, timeOfReading } = readFiles(fileNames);
		result.push({ results, timeOfReading, timeOfCreating });
	}
	removeFiles();
	const endTime = performance.now();
	return { results: result, timeOfExecution: endTime - startTime };
};

(async () => {
	if (Bun.argv.length < 6) {
		process.exit(1);
	}

	const numberOfIterations = Number(Bun.argv.at(2));
	const numberOfFiles = Number(Bun.argv.at(3));
	const numberOfParagraphs = Number(Bun.argv.at(4));
	const shouldBeBunFiles = Boolean(Bun.argv.at(5));

	if (!numberOfFiles || !numberOfParagraphs || !numberOfIterations) {
		process.exit(1);
	}

	const result = await performBenchmark(numberOfFiles, numberOfParagraphs, numberOfIterations, shouldBeBunFiles);

	fs.writeFileSync(path.join(import.meta.dir, "bunFilesResult.json"), JSON.stringify(result));

	process.exit(0);
})();

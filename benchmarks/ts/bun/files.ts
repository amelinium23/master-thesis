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
		const startTime = performance.now();
		const fileName = path.join(import.meta.dir, directory, `${startFileName}-${i + 1}.txt`).toString();
		await createBunFile(fileName, numberOfParagraphs);
		const endTime = performance.now();
		fileNames.push({ fileName, time: endTime - startTime });
	}
	const endTime = performance.now();
	return {
		fileNames: fileNames.map(({ fileName }) => fileName),
		times: fileNames.map(({ time }) => time),
		timeOfCreating: endTime - startTime,
	};
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
		const startTime = performance.now();
		const fileName = path.join(import.meta.dir, directory, `${startFileName}-${i + 1}.txt`).toString();
		createFile(fileName, numberOfParagraphs);
		const endTime = performance.now();
		fileNames.push({ fileName, time: endTime - startTime });
	}
	const endTime = performance.now();
	return {
		fileNames: fileNames.map(({ fileName }) => fileName),
		times: fileNames.map(({ time }) => time),
		timeOfCreating: endTime - startTime,
	};
};

const readFiles = (fileNames: string[]) => {
	const resultOfWriting = [];
	const startTime = performance.now();
	for (const fileName of fileNames) {
		try {
			const startTime = performance.now();
			const realFileName = fileName
				.split("/")
				.filter((s) => s)
				.reverse()[0];
			const lines = fs.readFileSync(path.join(import.meta.dir, "tmp", realFileName).toString(), {
				encoding: "utf-8",
			});
			const content = lines.toString();
			const endTime = performance.now();
			resultOfWriting.push({ content: content, time: endTime - startTime });
		} catch (err) {
			console.error(err);
		}
	}
	const endTime = performance.now();
	return { results: resultOfWriting, times: resultOfWriting.map(({ time }) => time), time: endTime - startTime };
};

const readBunFiles = async (fileNames: string[]) => {
	const resultOfWriting = [];
	const startTime = performance.now();

	for (const fileName of fileNames) {
		try {
			const startTime = performance.now();
			const file = Bun.file(fileName);
			const lines = await file.text();
			const endTime = performance.now();
			resultOfWriting.push({ lines, time: endTime - startTime });
		} catch (err) {
			console.error(err);
		}
	}
	const endTime = performance.now();

	return {
		results: resultOfWriting.map(({ lines }) => lines),
		times: resultOfWriting.map(({ time }) => time),
		time: endTime - startTime,
	};
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
	const results = [];
	const startTime = performance.now();
	for (let i = 0; i < numberOfIterations; i++) {
		const resultOfWriting = await createBatchOfBunFiles(numberOfFiles, filePrefix, numOfParagraphs);
		const resultOfReading = await readBunFiles(resultOfWriting.fileNames);
		results.push({ resultOfReading, resultOfWriting });
	}
	removeFiles();
	const endTime = performance.now();
	return { results, timeOfExecution: endTime - startTime };
};

const performBenchmarkFs = (
	numberOfFiles: number,
	numOfParagraphs: number,
	numberOfIterations: number,
	filePrefix = "lorem"
) => {
	const results = [];
	const startTime = performance.now();
	for (let i = 0; i < numberOfIterations; i++) {
		const resultOfWriting = createBatchOfFiles(numberOfFiles, filePrefix, numOfParagraphs);
		const resultOfReading = readFiles(resultOfWriting.fileNames);
		results.push({ resultOfWriting, resultOfReading });
	}
	removeFiles();
	const endTime = performance.now();
	return { results, timeOfExecution: endTime - startTime };
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

const fs = require("fs");
const path = require("path");
const { faker, en } = require("@faker-js/faker");

const createFile = async (fileName, numberOfParagraphs) => {
	return await fs.writeFile(fileName, faker.lorem.paragraphs(numberOfParagraphs), (err) => console.error(err));
};

const createBatchOfFiles = async (numberOfFiles, startFileName, numberOfParagraphs = 20, directory = "tmp") => {
	const fileNames = [];
	for (let i = 0; i < numberOfFiles; i++) {
		if (!fs.existsSync(path.join(__dirname, directory))) {
			await fs.mkdir(path.join(__dirname, directory), (err) => console.error(err));
		}
		const fileName = path.join(__dirname, directory, `${startFileName}-${i + 1}.txt`);
		await createFile(fileName, numberOfParagraphs);
		fileNames.push(fileName);
	}
	return fileNames;
};

const parseContent = async (data, result, startTime) => {
	const endTime = performance.now();
	result.push({ data: data.toString(), time: endTime - startTime });
};

const readFiles = async (fileNames) => {
	const resultOfWriting = [];
	const startTime = performance.now();

	for (const fileName of fileNames) {
		const startTime = performance.now();
		try {
			const lines = fs.readFile(fileName, (err, data) => !err && parseContent(data, resultOfWriting, startTime));
			console.log(lines);
		} catch (err) {
			console.error(err);
		}
	}
	const endTime = performance.now();

	return { results: resultOfWriting, time: endTime - startTime };
};

(async () => {
	const fileNames = await createBatchOfFiles(10, "lorem", 100);
	const result = await readFiles(fileNames);
	console.log(result);
})();

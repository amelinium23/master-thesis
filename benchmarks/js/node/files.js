const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

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

(async () => {
	console.log(await createBatchOfFiles(10, "lorem", 20));
})();

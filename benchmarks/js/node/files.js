const fs = require("fs");
const path = require("path");
const { faker, en } = require("@faker-js/faker");

const createFile = async (fileName, numberOfParagraphs) => {
    return await fs.writeFile(fileName, faker.lorem.paragraphs(numberOfParagraphs), (err) => console.error(err));
};

const createBatchOfFiles = async (numberOfFiles, startFileName, numberOfParagraphs = 20) => {
    const fileNames = [];
    for (let i = 0; i < numberOfFiles; i++) {
        const fileName = path.join(__dirname, `${startFileName}-${i + 1}.txt`).toString();
        await createFile(fileName, numberOfParagraphs);
        fileNames.push(fileName);
    }
    return fileNames;
};

const readFiles = (fileNames) => {
    const resultOfWriting = [];
    const startTime = performance.now();

    for (const fileName of fileNames) {
        try {
            const textFileName = fileName
                .split("/")
                .filter((p) => p)
                .reverse()[0];
            const lines = fs.readFileSync(path.join(__dirname, `tmp/${textFileName}`));
            const content = lines.toString();
            console.log("🚀 ~ readFiles ~ content:", content);
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
    const result = readFiles(fileNames);
    console.log(result);
})();

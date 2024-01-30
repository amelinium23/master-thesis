import * as fs from "node:fs";
import * as path from "node:path";

const { faker } = require("@faker-js/faker");

const createFile = (fileName, numberOfParagraphs) => {
    return fs.writeFileSync(fileName, faker.lorem.paragraphs(numberOfParagraphs), (err) => {});
};

const createBatchOfFiles = (numberOfFiles, startFileName, numberOfParagraphs = 20, directory = "tmp") => {
    const startTime = performance.now();
    const fileNames = [];
    if (!fs.existsSync(path.join(__dirname, directory).toString())) {
        fs.mkdirSync(path.join(__dirname, directory));
    }
    for (let i = 0; i < numberOfFiles; i++) {
        const fileName = path.join(__dirname, directory, `${startFileName}-${i + 1}.txt`).toString();
        createFile(fileName, numberOfParagraphs);
        fileNames.push(fileName);
    }
    const endTime = performance.now();
    return { fileNames: fileNames, time: endTime - startTime };
};

const readFiles = (fileNames) => {
    const resultOfWriting = [];
    const startTime = performance.now();

    for (const fileName of fileNames) {
        try {
            const realFileName = fileName
                .split("/")
                .filter((s) => s)
                .reverse()[0];
            const lines = fs.readFileSync(path.join(__dirname, "tmp", realFileName).toString(), { encoding: "utf-8" });
            const content = lines.toString();
            resultOfWriting.push(content);
        } catch (err) {
            console.error(err);
        }
    }
    const endTime = performance.now();

    return { results: resultOfWriting, time: endTime - startTime };
};

const removeFiles = (directory = "tmp") => {
    fs.rmSync(path.join(__dirname, directory), { recursive: true, force: true });
};

(() => {
    const startTime = performance.now();
    const fileNames = createBatchOfFiles(10, "lorem", 100);
    const result = readFiles(fileNames.fileNames);
    const endTime = performance.now();
    console.log(endTime - startTime);
    console.log("🚀 ~ result:", result);
    removeFiles();
})();

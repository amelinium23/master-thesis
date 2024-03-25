const fs = require("fs");
const path = require("path");
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
    return { fileNames: fileNames, timeOfCreating: endTime - startTime };
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

    return { results: resultOfWriting, timeOfReading: endTime - startTime };
};

const removeFiles = (directory = "tmp") => {
    fs.rmSync(path.join(__dirname, directory), { recursive: true, force: true });
};

const performFilesBenchmark = (numberOfFiles, numberOfParagraphs, numberOfIterations) => {
    const result = [];
    const startTime = performance.now();

    for (let i = 0; i < numberOfIterations; i++) {
        const { fileNames, timeOfCreating } = createBatchOfFiles(numberOfFiles, "lorem", numberOfParagraphs);
        const { results, timeOfReading } = readFiles(fileNames);
        result.push({
            results,
            timeOfCreating,
            timeOfReading,
        });
    }
    const endTime = performance.now();
    removeFiles();

    return { results: result, timeToEnd: endTime - startTime };
};

(() => {
    if (process.argv.length < 6) {
        process.exit(1);
    }

    const numberOfIterations = Number(process.argv.at(3));
    const numberOfFiles = Number(process.argv.at(4));
    const numberOfParagraphs = Number(process.argv.at(5));

    if (!numberOfFiles || !numberOfParagraphs || !numberOfIterations) {
        process.exit(1);
    }

    const result = performFilesBenchmark();

    fs.writeFileSync(path.join(__dirname, "resultFiles.json"), JSON.stringify(result));

    process.exit(0);
})();

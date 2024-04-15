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
        const startTime = performance.now();
        const fileName = path.join(__dirname, directory, `${startFileName}-${i + 1}.txt`).toString();
        createFile(fileName, numberOfParagraphs);
        const { rss } = process.memoryUsage();
        const endTime = performance.now();
        fileNames.push({ fileName, time: endTime - startTime, rss });
    }
    const endTime = performance.now();
    return {
        fileNames: fileNames.map(({ fileName }) => fileName),
        times: fileNames.map(({ time }) => time),
        memory: fileNames.map(({ rss }) => rss),
        timeOfCreating: endTime - startTime,
    };
};

const readFiles = (fileNames) => {
    const resultOfWriting = [];
    const startTime = performance.now();
    for (const fileName of fileNames) {
        try {
            const startTime = performance.now();
            const realFileName = fileName
                .split("/")
                .filter((s) => s)
                .reverse()[0];
            const lines = fs.readFileSync(path.join(__dirname, "tmp", realFileName).toString(), { encoding: "utf-8" });
            const content = lines.toString();
            const endTime = performance.now();
            const { rss } = process.memoryUsage();
            resultOfWriting.push({ content, time: endTime - startTime, rss });
        } catch (err) {
            console.error(err);
        }
    }
    const endTime = performance.now();

    return {
        results: resultOfWriting,
        memory: fileNames.map(({ rss }) => rss),
        times: resultOfWriting.map(({ time }) => time),
        time: endTime - startTime,
    };
};

const removeFiles = (directory = "tmp") => {
    fs.rmSync(path.join(__dirname, directory), { recursive: true, force: true });
};

const performFilesBenchmark = (numberOfFiles, numberOfParagraphs, numberOfIterations) => {
    const results = [];
    const startTime = performance.now();
    for (let i = 0; i < numberOfIterations; i++) {
        const resultOfWriting = createBatchOfFiles(numberOfFiles, "lorem", numberOfParagraphs);
        const resultOfReading = readFiles(resultOfWriting.fileNames);
        results.push({
            resultOfReading,
            resultOfWriting,
        });
    }
    const endTime = performance.now();
    removeFiles();
    return { results, timeToEnd: endTime - startTime };
};

(() => {
    if (process.argv.length < 5) {
        process.exit(1);
    }

    const numberOfIterations = Number(process.argv.at(2));
    const numberOfFiles = Number(process.argv.at(3));
    const numberOfParagraphs = Number(process.argv.at(4));

    if (!numberOfFiles || !numberOfParagraphs || !numberOfIterations) {
        process.exit(1);
    }

    const result = performFilesBenchmark(numberOfFiles, numberOfParagraphs, numberOfIterations);

    fs.writeFileSync(path.join(__dirname, "nodeFilesResult.json"), JSON.stringify(result));

    process.exit(0);
})();

import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const createBunFile = async (fileName, numberOfParagraphs) => {
    const file = Bun.file(fileName);
    const writer = file.writer();
    for (const line of faker.lorem.paragraphs(numberOfParagraphs)) {
        writer.write(line);
    }
    await writer.flush();
    return file;
};

const createBatchOfBunFiles = async (numberOfFiles, startFileName, numberOfParagraphs = 20, directory = "tmp") => {
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
    return { fileNames: fileNames, time: endTime - startTime };
};

const createFile = (fileName, numberOfParagraphs) => {
    return fs.writeFileSync(fileName, faker.lorem.paragraphs(numberOfParagraphs));
};

const createBatchOfFiles = (numberOfFiles, startFileName, numberOfParagraphs = 20, directory = "tmp") => {
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

    return { results: resultOfWriting, time: endTime - startTime };
};

const readBunFiles = async (fileNames) => {
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

    return { results: resultOfWriting, time: endTime - startTime };
};

const removeFiles = (directory = "tmp") => {
    fs.rmSync(path.join(import.meta.dir, directory), { recursive: true, force: true });
};

const performBenchmark = async (numberOfFiles, numberOfParagraphs, numberOfIterations, shouldBeBunFiles = false) => {
    if (shouldBeBunFiles) {
        return await performBenchmarkBun(numberOfFiles, numberOfParagraphs, numberOfIterations);
    } else {
        return performBenchmarkFs(numberOfFiles, numberOfParagraphs, numberOfIterations);
    }
};

const performBenchmarkBun = async (numberOfFiles, numOfParagraphs, numberOfIterations, filePrefix = "lorem") => {
    const results = [];
    const startTime = performance.now();
    for (let i = 0; i < numberOfIterations; i++) {
        const startTime = performance.now();
        const fileNames = await createBatchOfBunFiles(numberOfFiles, filePrefix, numOfParagraphs);
        const result = await readBunFiles(fileNames.fileNames);
        const endTime = performance.now();
        results.push({ result, time: endTime - startTime });
    }
    removeFiles();
    const endTime = performance.now();
    return { time: endTime - startTime, results };
};

const performBenchmarkFs = (numberOfFiles, numOfParagraphs, numberOfIterations, filePrefix = "lorem") => {
    const results = [];
    const startTime = performance.now();
    for (let i = 0; i < numberOfIterations; i++) {
        const startTime = performance.now();
        const fileNames = createBatchOfFiles(numberOfFiles, filePrefix, numOfParagraphs);
        const result = readFiles(fileNames.fileNames);
        const endTime = performance.now();
        results.push({ result, time: endTime - startTime });
    }
    removeFiles();
    const endTime = performance.now();
    return { time: endTime - startTime, results };
};

(async () => {
    if (Bun.argv.length < 6) {
        process.stderr.write("[Files] You did not passed arguments");
        process.exit(1);
    }

    const numberOfIterations = Number(Bun.argv.at(2));
    const numberOfFiles = Number(Bun.argv.at(3));
    const numberOfParagraphs = Number(Bun.argv.at(4));
    const shouldBeBunFiles = Boolean(Bun.argv.at(5));

    if (!numberOfFiles || !numberOfParagraphs || !numberOfIterations) {
        process.stderr.write("[Files] Cannot parse arguments!");
        process.exit(1);
    }

    const result = await performBenchmark(numberOfFiles, numberOfParagraphs, numberOfIterations, shouldBeBunFiles);

    fs.writeFileSync(path.join(import.meta.dir, "bunCreateFile.json"), JSON.stringify(result));

    process.exit(0);
})();

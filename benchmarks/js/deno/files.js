import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import * as path from "https://deno.land/std@0.213.0/path/mod.ts";
import { fromMeta } from "https://deno.land/x/dirname_deno@v0.3.0/mod.ts";
import { existsSync } from "https://deno.land/std@0.213.0/fs/mod.ts";

const { __dirname } = fromMeta(import.meta);

const createFile = (fileName, numberOfParagraphs) => {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(faker.lorem.paragraphs(numberOfParagraphs));
    return Deno.writeFileSync(fileName, data);
};

const createBatchOfFiles = (numberOfFiles, startFileName, numberOfParagraphs = 20, directory = "tmp") => {
    const startTime = performance.now();
    const fileNames = [];
    if (!existsSync(path.join(__dirname, directory).toString(), { isDirectory: true })) {
        Deno.mkdirSync(path.join(__dirname, directory));
    }
    for (let i = 0; i < numberOfFiles; i++) {
        const startTime = performance.now();
        const fileName = path.join(__dirname, directory, `${startFileName}-${i + 1}.txt`);
        createFile(fileName, numberOfParagraphs);
        const endTime = performance.now();
        fileNames.push({ fileName: fileName, time: endTime - startTime });
    }
    const endTime = performance.now();
    return {
        fileNames: fileNames.map(({ fileName }) => fileName),
        times: fileNames.map(({ time }) => time),
        timeOfCreating: endTime - startTime,
    };
};

const readFiles = (fileNames) => {
    const resultOfWriting = [];
    const startTime = performance.now();
    for (const fileName of fileNames) {
        try {
            const startTime = performance.now();
            const data = Deno.readFileSync(fileName);
            const textDecoder = new TextDecoder("utf-8");
            const content = textDecoder.decode(data);
            const endTime = performance.now();
            resultOfWriting.push({ content: content, time: endTime - startTime });
        } catch (err) {
            console.error(err);
        }
    }
    const endTime = performance.now();
    return {
        results: resultOfWriting,
        times: resultOfWriting.map(({ time }) => time),
        timeOfReading: endTime - startTime,
    };
};

const removeFiles = (directory = "tmp") => {
    if (existsSync(path.join(__dirname, directory)))
        Deno.removeSync(path.join(__dirname, directory), { recursive: true, force: true });
};

const performFilesBenchmark = (numberOfFiles, numberOfParagraphs, numberOfIterations) => {
    const result = [];
    const startTime = performance.now();
    for (let i = 0; i < numberOfIterations; i++) {
        const resultOfWriting = createBatchOfFiles(numberOfFiles, "lorem", numberOfParagraphs);
        const resultOfReading = readFiles(resultOfWriting.fileNames);
        result.push({
            resultOfReading,
            resultOfWriting,
        });
    }
    const endTime = performance.now();
    removeFiles();
    return { results: result, timeOfExecution: endTime - startTime };
};

(() => {
    if (Deno.args < 3) {
        Deno.exit(1);
    }

    const numberOfIterations = Number(Deno.args.at(0));
    const numberOfFiles = Number(Deno.args.at(1));
    const numberOfParagraphs = Number(Deno.args.at(2));

    if (!numberOfFiles || !numberOfParagraphs || !numberOfIterations) {
        Deno.exit(1);
    }

    const result = performFilesBenchmark(numberOfFiles, numberOfParagraphs, numberOfIterations);
    const encoder = new TextEncoder();
    const encodedResult = encoder.encode(JSON.stringify(result));

    Deno.writeFileSync(`${__dirname}/denoFilesResult.json`, encodedResult);

    Deno.exit(0);
})();

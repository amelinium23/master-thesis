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
    if (!existsSync(path.join(__dirname, directory).toString())) {
        Deno.mkdirSync(path.join(__dirname, directory));
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
            const data = Deno.readFileSync(fileName);
            const textDecoder = new TextDecoder("utf-8");
            const content = textDecoder.decode(data);
            resultOfWriting.push(content);
        } catch (err) {
            console.error(err);
        }
    }
    const endTime = performance.now();

    return { results: resultOfWriting, time: endTime - startTime };
};

const removeFiles = (directory = "tmp") => {
    Deno.removeSync(path.join(__dirname, directory), { recursive: true, force: true });
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

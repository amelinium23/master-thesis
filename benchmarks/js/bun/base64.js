import { format } from "node:util";
import path from "node:path";
import fs from "node:fs";

const STR_SIZE = 131072;
const TRIES = 8192;

const notify = (msg) => console.log(msg);

const startEncoding = (buffer, str2) => {
    let encodedString = 0;
    const start = performance.now();
    for (let i = 0; i < TRIES; i++) {
        encodedString += buffer.toString("base64").length;
    }
    const end = performance.now();
    const timeEncoding = (end - start) / 1000;

    notify(
        format(
            "encode %s... to %s...: %d, %d",
            buffer.toString("utf8", 0, 4),
            str2.substring(0, 4),
            encodedString,
            timeEncoding
        )
    );

    return { encodedString, timeEncoding };
};

const startDecoding = (str2, str3) => {
    let decodedString = 0;
    const startDecoded = performance.now();
    for (let i = 0; i < TRIES; i++) {
        decodedString += Buffer.from(str2, "base64").length;
    }
    const endDecoding = performance.now();
    const timeDecoded = (endDecoding - startDecoded) / 1000;

    notify(
        format(
            "decode %s... to %s...: %d, %d",
            str2.substring(0, 4),
            str3.toString("utf8", 0, 4),
            decodedString,
            timeDecoded
        )
    );

    return { timeDecoded, decodedString };
};

const performBase64Benchmark = (numberOfIterations) => {
    const resultOfEncoding = [];
    const resultOfDecoding = [];
    const buffer = Buffer.from("a".repeat(STR_SIZE));
    const str2 = buffer.toString("base64");
    const str3 = Buffer.from(str2, "base64");

    for (let i = 0; i < numberOfIterations; i++) {
        const result = startEncoding(buffer, str2);
        resultOfEncoding.push(result);
    }

    for (let i = 0; i < numberOfIterations; i++) {
        const result = startDecoding(str2, str3);
        resultOfDecoding.push(result);
    }

    return { resultOfDecoding, resultOfEncoding };
};

(() => {
    if (Bun.argv.length < 3) {
        process.exit(1);
    }

    const numberOfIterations = Number(Bun.argv.at(2));

    const { resultOfDecoding, resultOfEncoding } = performBase64Benchmark(numberOfIterations);

    fs.writeFileSync(path.join(__dirname, "encodedResult.json"), JSON.stringify(resultOfEncoding));
    fs.writeFileSync(path.join(__dirname, "decodedResult.json"), JSON.stringify(resultOfDecoding));

    process.exit(0);
})();

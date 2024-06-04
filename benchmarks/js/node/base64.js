const fs = require("fs");
const path = require("path");
const util = require("util");

const STR_SIZE = 65536;
const TRIES = 256;

const notify = (msg) => console.log(msg);

const startEncoding = (buffer, str2) => {
    let encodedString = 0;
    const start = performance.now();
    for (let i = 0; i < TRIES; i++) {
        encodedString += buffer.toString("base64").length;
    }
    const { rss } = process.memoryUsage();
    const realRss = rss / 1024;
    const end = performance.now();
    const timeEncoding = end - start;

    notify(
        util.format(
            "encode %s... to %s...: %d, %d",
            buffer.toString("utf8", 0, 4),
            str2.substring(0, 4),
            encodedString,
            timeEncoding
        )
    );

    return { encodedString, timeEncoding, rss: realRss };
};

const startDecoding = (str2, str3) => {
    let decodedString = 0;
    const startDecoded = performance.now();
    for (let i = 0; i < TRIES; i++) {
        decodedString += Buffer.from(str2, "base64").length;
    }
    const { rss } = process.memoryUsage();
    const realRss = rss / 1024;
    const endDecoding = performance.now();
    const timeDecoded = endDecoding - startDecoded;

    notify(
        util.format(
            "decode %s... to %s...: %d, %d",
            str2.substring(0, 4),
            str3.toString("utf8", 0, 4),
            decodedString,
            timeDecoded
        )
    );

    return { timeDecoded, decodedString, rss: realRss };
};

const performBase64Benchmark = (numberOfIterations) => {
    const resultOfEncoding = [];
    const resultOfDecoding = [];
    const buffer = Buffer.from("a".repeat(STR_SIZE));
    const str2 = buffer.toString("base64");
    const str3 = Buffer.from(str2, "base64");

    notify(`Node.js\t\nPID: ${process.pid}`);

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
    if (process.argv.length < 3) {
        process.exit(1);
    }

    const numberOfIterations = Number(process.argv.at(2));

    const result = performBase64Benchmark(numberOfIterations);

    fs.writeFileSync(path.join(__dirname, "nodeBase64Result.json"), JSON.stringify(result));

    process.exit(0);
})();

import { Buffer } from "https://deno.land/std@0.177.0/node/buffer.ts";
import * as mod from "https://deno.land/std@0.110.0/node/util.ts";
import { fromMeta } from "https://deno.land/x/dirname_deno@v0.3.0/src/file_info.ts";

const { __dirname } = fromMeta(import.meta);

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
        mod.format(
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
        mod.format(
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
    if (Deno.args.length < 1) {
        Deno.stderr.write("[Base64] You did not passed arguments!");
        Deno.exit(1);
    }

    const numberOfIterations = Number(Deno.args.at(0));

    if (!numberOfIterations) {
        Deno.stderr.write("[Base64] You passed arguments that could not be parsed!");
        Deno.exit(1);
    }

    const { resultOfDecoding, resultOfEncoding } = performBase64Benchmark(numberOfIterations);

    const encoderForEncodedResult = new TextEncoder();
    const encodedEncodedResult = encoderForEncodedResult.encode(JSON.stringify(resultOfEncoding));

    Deno.writeFileSync(`${__dirname}/denoEncodedResult.json`, encodedEncodedResult);

    const encoder = new TextEncoder();
    const encodedDecodedResult = encoder.encode(JSON.stringify(resultOfDecoding));

    Deno.writeFileSync(`${__dirname}/denoDecodedResult.json`, encodedDecodedResult);

    Deno.exit(0);
})();

"use strict";

const util = require("util");

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
        util.format(
            "encode %s... to %s...: %d, %d",
            buffer.toString("utf8", 0, 4),
            str2.substring(0, 4),
            encodedString,
            timeEncoding
        )
    );
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
        util.format(
            "decode %s... to %s...: %d, %d",
            str2.substring(0, 4),
            str3.toString("utf8", 0, 4),
            decodedString,
            timeDecoded
        )
    );
};

function main() {
    const buffer = Buffer.from("a".repeat(STR_SIZE));
    const str2 = buffer.toString("base64");
    const str3 = Buffer.from(str2, "base64");

    notify(`Node.js\t\nPID: ${process.pid}`);

    startEncoding(buffer, str2);

    startDecoding(str2, str3);
}

(() => main())();

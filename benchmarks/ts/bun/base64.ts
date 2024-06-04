import { format } from "node:util";
import path from "node:path";
import fs from "node:fs";

const STR_SIZE = 65536;
const TRIES = 256;

const notify = (msg: string) => console.log(msg);

const startEncoding = (buffer: Buffer, str2: string) => {
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
		format(
			"encode %s... to %s...: %d, %d",
			buffer.toString("utf8", 0, 4),
			str2.substring(0, 4),
			encodedString,
			timeEncoding
		)
	);

	return { encodedString, rss: realRss, timeEncoding };
};

const startDecoding = (str2: string, str3: Buffer) => {
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
		format(
			"decode %s... to %s...: %d, %d",
			str2.substring(0, 4),
			str3.toString("utf8", 0, 4),
			decodedString,
			timeDecoded
		)
	);

	return { timeDecoded, rss: realRss, decodedString };
};

const performBase64Benchmark = (numberOfIterations: number) => {
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
		process.stderr.write("[Base64] You did not passed arguments");
		process.exit(1);
	}

	const numberOfIterations = Number(Bun.argv.at(2));

	const result = performBase64Benchmark(numberOfIterations);

	fs.writeFileSync(path.join(import.meta.dir, "bunBase64Result.json"), JSON.stringify(result));

	process.exit(0);
})();

import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import { fromMeta } from "https://deno.land/x/dirname_deno@v0.3.0/src/file_info.ts";
import { User } from "../types/user.ts";
import { Row } from "https://deno.land/x/sqlite@v3.8/src/query.ts";

const { __dirname } = fromMeta(import.meta);

const createFakeUser = () => {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		gender: faker.name.gender(),
		bio: faker.lorem.sentence(),
		jobArea: faker.name.jobArea(),
		jobTitle: faker.name.jobTitle(),
		jobType: faker.name.jobType(),
	};
};

const createTable = (db: DB) => {
	try {
		return db.execute(
			"CREATE TABLE IF NOT EXISTS Users (firstName TEXT, lastName TEXT, gender TEXT, bio TEXT, jobArea TEXT, jobTitle TEXT, jobType TEXT)"
		);
	} catch (err) {
		throw err;
	}
};

const dropTable = (db: DB) => {
	try {
		return db.execute("DROP TABLE IF EXISTS Users");
	} catch (err) {
		throw err;
	}
};

const insertUser = (db: DB, user: User) => {
	try {
		return db.query(
			"INSERT INTO Users (firstName, lastName, gender, bio, jobArea, jobTitle, jobType) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[user.firstName, user.lastName, user.gender, user.bio, user.jobArea, user.jobTitle, user.jobType]
		);
	} catch (err) {
		throw err;
	}
};

const getUserFromDatabase = (db: DB) => {
	try {
		return db.query("SELECT firstName, lastName, gender, bio, jobArea, jobTitle, jobType FROM Users");
	} catch (e) {
		throw e;
	}
};

const createConnection = () => {
	try {
		return new DB("deno.db");
	} catch (err) {
		throw err;
	}
};

const mapUser = (values: Row) => {
	if (values.length > 7) return {};

	return {
		firstName: values[0],
		lastName: values[1],
		gender: values[2],
		bio: values[3],
		jobArea: values[4],
		jobTitle: values[5],
		jobType: values[6],
	};
};

const performSqliteBenchmark = (numOfIterations: number, numOfRecords: number) => {
	const conn = createConnection();
	dropTable(conn);
	createTable(conn);
	const startTime = performance.now();

	for (let i = 0; i < numOfIterations; i++) {
		for (let j = 0; j < numOfRecords; j++) {
			insertUser(conn, createFakeUser());
		}
	}

	const endTime = performance.now();
	const users = getUserFromDatabase(conn);
	const mappedUsers = users.map(mapUser);

	return { time: endTime - startTime, users: mappedUsers };
};

(() => {
	if (Deno.args.length < 3) {
		Deno.exit(1);
	}

	const numberOfIterations = Number(Deno.args.at(0));
	const numberOfRecords = Number(Deno.args.at(1));
	const noOfBenchmarks = Number(Deno.args.at(2));

	const results = [];

	if (!numberOfIterations || !numberOfRecords || !noOfBenchmarks) {
		Deno.exit(1);
	}

	for (let i = 0; i < noOfBenchmarks; i++) {
		const result = performSqliteBenchmark(numberOfIterations, numberOfRecords);
		results.push(result);
	}

	const encoder = new TextEncoder();
	const encodedResult = encoder.encode(JSON.stringify(results));

	Deno.writeFileSync(`${__dirname}/denoSqlite.json`, encodedResult);

	Deno.exit(0);
})();

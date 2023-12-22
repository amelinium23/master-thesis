import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import { User } from "../types";

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

const createTable = async (db: DB) => {
	try {
		return db.execute(
			"CREATE TABLE IF NOT EXISTS Users (firstName TEXT, lastName TEXT, gender TEXT, bio TEXT, jobArea TEXT, jobTitle TEXT, jobType TEXT)"
		);
	} catch (err) {
		throw err;
	}
};

const dropTable = async (db: DB) => {
	try {
		return db.execute("DROP TABLE IF EXISTS Users");
	} catch (err) {
		throw err;
	}
};

const insertUser = async (db: DB, user: User) => {
	try {
		return db.query(
			"INSERT INTO Users (firstName, lastName, gender, bio, jobArea, jobTitle, jobType) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[user.firstName, user.lastName, user.gender, user.bio, user.jobArea, user.jobTitle, user.jobType]
		);
	} catch (err) {
		throw err;
	}
};

const getUserFromDatabase = async (db: DB) => {
	try {
		return db.query("SELECT firstName, lastName, gender, bio, jobArea, jobTitle, jobType FROM Users");
	} catch (e) {
		throw e;
	}
};

const createConnection = async () => {
	try {
		return new DB("deno.db");
	} catch (err) {
		throw err;
	}
};

const mapUser = (values: string[]) => {
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

const performSqliteBenchmark = async (numOfIterations: number, numOfRecords: number) => {
	const conn = await createConnection();
	await dropTable(conn);
	await createTable(conn);
	const startTime = performance.now();

	for (let i = 0; i < numOfIterations; i++) {
		for (let j = 0; j < numOfRecords; j++) {
			await insertUser(conn, createFakeUser());
		}
	}

	const endTime = performance.now();
	const users = await getUserFromDatabase(conn);
	const mappedUsers = users.map(mapUser);

	return { time: endTime - startTime, users: mappedUsers };
};

(async () => {
	const result = await performSqliteBenchmark(100, 100);
	console.log("Result: \n", result.time);
})();

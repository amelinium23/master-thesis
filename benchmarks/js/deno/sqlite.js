import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";

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

const createTable = async (db) => {
	try {
		return db.execute(
			"CREATE TABLE IF NOT EXISTS Users (firstName TEXT, lastName TEXT, gender TEXT, bio TEXT, jobArea TEXT, jobTitle TEXT, jobType TEXT)"
		);
	} catch (err) {
		throw err;
	}
};

const dropTable = async (db) => {
	try {
		return db.execute("DROP TABLE IF EXISTS Users");
	} catch (err) {
		throw err;
	}
};

const insertUser = async (db, user) => {
	try {
		return db.query(
			"INSERT INTO Users (firstName, lastName, gender, bio, jobArea, jobTitle, jobType) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[user.firstName, user.lastName, user.gender, user.bio, user.jobArea, user.jobTitle, user.jobType]
		);
	} catch (err) {
		throw err;
	}
};

const getUserFromDatabase = async (db) => {
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

/**
 * Perform benchmark for creating users for n-time of iterations and m-times of users
 *
 * @param {number} numOfIterations
 * @param {number} numOfRecords
 * @returns {{time: number, users: typeof createFakeUser()[]}}
 */
const performSqliteBenchmark = async (numOfIterations, numOfRecords) => {
	const conn = await createConnection();
	dropTable(conn);
	createTable(conn);
	const startTime = performance.now();

	for (let i = 0; i < numOfIterations; i++) {
		for (let j = 0; j < numOfRecords; j++) {
			await insertUser(conn, createFakeUser());
		}
	}

	const endTime = performance.now();
	const users = await getUserFromDatabase(conn);

	return { time: endTime - startTime, users };
};

(async () => {
	const result = await performSqliteBenchmark(100, 100);
	console.log("Result: \n", result);
})();

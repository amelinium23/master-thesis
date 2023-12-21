const { faker } = require("@faker-js/faker");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const createFakeUser = () => {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		gender: faker.person.gender(),
		bio: faker.person.bio(),
		jobArea: faker.person.jobArea(),
		jobTitle: faker.person.jobTitle(),
		jobType: faker.person.jobType(),
	};
};

const createTable = async (db) => {
	try {
		return await db.exec(
			"CREATE TABLE IF NOT EXISTS Users (firstName TEXT, lastName TEXT, gender TEXT, bio TEXT, jobArea TEXT, jobTitle TEXT, jobType TEXT)"
		);
	} catch (err) {
		throw err;
	}
};

const insertUser = async (db, user) => {
	try {
		return db.run(
			"INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?)",
			user.firstName,
			user.lastName,
			user.gender,
			user.bio,
			user.jobArea,
			user.jobTitle,
			user.jobType
		);
	} catch (err) {
		throw err;
	}
};

const getUserFromDatabase = async (db) => {
	try {
		return db.all("SELECT * FROM Users");
	} catch (e) {
		throw e;
	}
};

const createConnection = async () => {
	try {
		return await open({ filename: "./database.db", driver: sqlite3.Database });
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
	createTable(conn);
	const startTime = performance.now();

	for (let i = 0; i < numOfIterations; i++) {
		for (let j = 0; j < numOfRecords; j++) {
			await insertUser(conn, createFakeUser());
		}
	}

	const endTime = performance.now();

	conn.close();
	return { time: endTime - startTime, users: await getUserFromDatabase(conn) };
};

(async () => {
	console.log(performSqliteBenchmark(100, 100));
})();

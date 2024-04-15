import { faker } from "@faker-js/faker";
import { open, Database as SqLiteDatabase } from "sqlite";
import { Database, Statement } from "sqlite3";
import { User } from "../types";
import fs from "fs";
import path from "path";

const createFakeUser = (): User => {
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

const createTable = async (db: SqLiteDatabase<Database, Statement>) => {
	try {
		return await db.exec(
			"CREATE TABLE IF NOT EXISTS Users (firstName TEXT, lastName TEXT, gender TEXT, bio TEXT, jobArea TEXT, jobTitle TEXT, jobType TEXT)"
		);
	} catch (err) {
		throw err;
	}
};

const dropTable = async (db: SqLiteDatabase<Database, Statement>) => {
	try {
		return db.exec("DROP TABLE IF EXISTS Users");
	} catch (err) {
		throw err;
	}
};

const insertUser = async (db: SqLiteDatabase<Database, Statement>, user: User) => {
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

const getUserFromDatabase = async (db: SqLiteDatabase<Database, Statement>) => {
	try {
		return db.all("SELECT * FROM Users");
	} catch (e) {
		throw e;
	}
};

const createConnection = async () => {
	try {
		return await open({ filename: "./node.db", driver: Database });
	} catch (err) {
		throw err;
	}
};

const performSqliteBenchmark = async (numOfIterations: number, numOfRecords: number) => {
	const times = [];
	const memoryUsage = [];
	const conn = await createConnection();
	await dropTable(conn);
	await createTable(conn);
	const startTime = performance.now();
	for (let i = 0; i < numOfIterations; i++) {
		const startTime = performance.now();
		for (let j = 0; j < numOfRecords; j++) {
			await insertUser(conn, createFakeUser());
		}
		const memory = process.memoryUsage().rss;
		const endTime = performance.now();
		times.push(endTime - startTime);
		memoryUsage.push(memory);
	}
	const endTime = performance.now();
	return { time: endTime - startTime, times, memory: memoryUsage, users: await getUserFromDatabase(conn) };
};

(async () => {
	if (process.argv.length < 4) {
		process.exit(0);
	}

	const numberOfIterations = Number(process.argv.at(2));
	const numberOfRecords = Number(process.argv.at(3));

	if (!numberOfIterations || !numberOfRecords) {
		process.exit(1);
	}

	const result = await performSqliteBenchmark(numberOfIterations, numberOfRecords);

	fs.writeFileSync(path.join(__dirname, "nodeSqlite.json"), JSON.stringify(result));

	process.exit(0);
})();

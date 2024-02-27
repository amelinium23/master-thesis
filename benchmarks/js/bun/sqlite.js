import { Database } from "bun:sqlite";

const { faker } = require("@faker-js/faker");

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
        return db
            .query(
                "CREATE TABLE IF NOT EXISTS Users (firstName TEXT, lastName TEXT, gender TEXT, bio TEXT, jobArea TEXT, jobTitle TEXT, jobType TEXT)"
            )
            .run();
    } catch (err) {
        throw err;
    }
};

const insertUser = async (db, user) => {
    try {
        return db
            .query("INSERT INTO Users VALUES ($firstName, $lastName, $gender, $bio, $jobArea, $jobTitle, $jobType)")
            .run({
                $firstName: user.firstName,
                $lastName: user.lastName,
                $gender: user.gender,
                $bio: user.bio,
                $jobArea: user.jobArea,
                $jobTitle: user.jobTitle,
                $jobType: user.jobType,
            });
    } catch (err) {
        throw err;
    }
};

const getUserFromDatabase = async (db) => {
    try {
        return db.query("SELECT * FROM Users").all();
    } catch (e) {
        throw e;
    }
};

const createConnection = async () => {
    try {
        return new Database("./bun.db");
    } catch (err) {
        throw err;
    }
};

const dropTable = async (db) => {
    try {
        return db.query("DROP TABLE IF EXISTS Users").run();
    } catch (err) {
        throw err;
    }
};

const performSqliteBenchmark = async (numOfIterations, numOfRecords) => {
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

    return { time: endTime - startTime, users: await getUserFromDatabase(conn) };
};

(async () => {
    if (process.argv.length < 5) {
        process.exit(0);
    }

    const numberOfIterations = Number(process.argv.at(2));
    const numberOfRecords = Number(process.argv.at(3));
    const noOfBenchmarks = Number(process.argv.at(4));

    const results = [];

    if (!numberOfIterations || !numberOfRecords || !noOfBenchmarks) {
        process.exit(1);
    }

    for (let i = 0; i < noOfBenchmarks; i++) {
        const result = await performSqliteBenchmark(numberOfIterations, numberOfRecords);
        results.push(result);
    }

    fs.writeFileSync(path.join(__dirname, "nodeSqlite.json"), JSON.stringify(results));

    process.exit(0);
})();

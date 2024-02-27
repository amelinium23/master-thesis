const http = require("http");
const url = require("url");
const { faker } = require("@faker-js/faker");

const PORT = 3000;
const hostName = "127.0.0.1";

const createFakeUser = () => {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		gender: faker.person.gender(),
		bio: faker.person.bio(),
		description: faker.lorem.paragraphs(20),
		jobArea: faker.person.jobArea(),
		jobTitle: faker.person.jobTitle(),
		jobType: faker.person.jobType(),
	};
};

const server = http.createServer(
	(
		req: { url: string },
		res: {
			statusCode: number;
			setHeader: (headerName: string, headerValue: string) => void;
			end: (content: string) => void;
		}
	) => {
		const { pathname } = url.parse(req.url as string);

		if (pathname && pathname.includes("user")) {
			res.statusCode = 200;
			res.setHeader("Content-type", "text/plain");
			res.end(JSON.stringify(createFakeUser()));
		} else {
			res.statusCode = 200;
			res.setHeader("Content-type", "text/plain");
			res.end("Hello World");
		}
	}
);

server.listen(PORT, hostName, () => {
	console.log(`Server running at http://${hostName}:${PORT}/`);
});

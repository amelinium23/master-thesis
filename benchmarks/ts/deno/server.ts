import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";

const port = 3004;

const createFakeUser = () => {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		gender: faker.name.gender(),
		bio: faker.lorem.sentence(),
		description: faker.lorem.sentences(80),
		jobArea: faker.name.jobArea(),
		jobTitle: faker.name.jobTitle(),
		jobType: faker.name.jobType(),
	};
};

const handler = (request: Request) => {
	if (request.url.includes("users")) {
		return new Response(JSON.stringify(createFakeUser()), { status: 200 });
	}

	const body = `Your user-agent is: ${request.headers.get("user-agent") ?? "Unknown"}`;

	return new Response(body, { status: 200 });
};

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
Deno.serve({ port }, handler);

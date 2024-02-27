const { faker } = require("@faker-js/faker");

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

Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("Home Page!");
        if (url.pathname === "/users") return new Response(JSON.stringify(createFakeUser()));
        return new Response("404");
    },
});

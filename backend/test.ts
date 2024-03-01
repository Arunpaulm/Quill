const server = require('./dist/index')
const supertest = require('supertest')
const { describe, expect, it } = require('@jest/globals');

const requestWithSupertest = supertest(server);

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRmMjI0MWRhZTI1ODMxNDYxOWM1MmQiLCJpYXQiOjE3MDkzMDY3NDMsImV4cCI6MTcwOTMxMDM0M30.9Q5rw0f-urD9tJUbJH3k45aZz0PYHWfPP4GzdKg-njc`
describe('User Endpoints', () => {

    it('GET /user should show all users', async () => {
        const res = await supertest(server)
            .get("/users")
            // .set('Authorization', `Bearer ${token}`)
            .expect(200)

        // console.log(res.body)
        // console.log(res.status)
    });

});

describe('Book Endpoints', () => {

    it('GET /graphql should show all book', async () => {

        const res = await supertest(server)
            .post("/graphql")
            // .set('Authorization', `Bearer ${token}`)
            // .send({ "query": "query Query {\n  books {\n    description\n    name\n    id\n    url\n  }\n}", "variables": {} })
            // .expect(200)
            .expect(401)

        // expect(res.body.data.books).anything;
        // console.log(res.body)
        // console.log(res.status)
    });

});

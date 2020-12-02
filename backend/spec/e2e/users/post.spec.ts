import app from '../../../src/app'
import request from 'supertest'
import HttpCode from 'http-status-codes'

describe("Users module - POST", () => {

    // CALLER

    const caller = async (data) => {
        return request(app)
            .post('/api/users')
            .send(data);
    };

    // TESTS

    it("Failure", async () => {

        const data = {
            email: "test@test.com"
        };

        const res = await caller(data);
        expect(res.statusCode).toEqual(HttpCode.UNPROCESSABLE_ENTITY)
    });


    it("Success", async () => {

        const data = {
            email: "test@test.com",
            password: "password",
            birth_date: new Date(),
            firstname: "Testname",
            lastname: "Testsurname"
        };

        const res = await caller(data);
        expect(res.statusCode).toEqual(HttpCode.CREATED)
    });
});
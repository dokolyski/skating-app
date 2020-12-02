import app from '../../../src/app'
import request from 'supertest'
import HttpCode from 'http-status-codes'
import User from '../../../src/models/users'
import db from '../../../src/static/database'

describe("Users module - POST", () => {

    // CALLER

    const caller = async (data) => {

        return request(app)
            .post('/api/users')
            .send(data);
    };

    // TESTS

    it("Failure", async () => {
        User.truncate({cascade: true});

        const data = {
            email: "test@test.com"
        };

        const res = await caller(data);
        expect(res.statusCode).toEqual(HttpCode.UNPROCESSABLE_ENTITY)
    });


    it("Success", async () => {
        User.truncate({cascade: true});

        const data = {
            email: "test@test.com",
            password: "m*k&JF$rf45MFg",
            firstname: "Testname",
            lastname: "Testsurname",
            birth_date: "1999-06-07T14:34:08"
        };

        const res = await caller(data);
        expect(res.statusCode).toEqual(HttpCode.CREATED)
    });
});
'use strict'
const request = require('supertest')
const app = require('../app')


jest.useRealTimers();
/* describe('Post /sign-up', () => {
    describe("when passed a email , password and role", () => {
        it('should create a new user', async () => {
            let user = { name: "Test", email: "test@gmail.com", password: 'test6661', role: "user" }
            const res = await request(app).post('/sign-up').send(user)
            expect(res.statusCode).toBe(201)
        })
    })
    describe("when passed a email , password and role is missing", () => {
        it('should return a 422 status code to show there was a validation error', async () => {
            let user = { name: "", email: "test@gmail.com", password: 'test6661', role: "user" }
            const res = await request(app).post('/sign-up').send(user)
            expect(res.statusCode).toBe(422)
        })
    })
    describe("when the email duplicate", () => {
        it("should return a 409 status code to show there was a Email Duplicate error", async () => {
            let user = { name: "Test", email: "test@gmail.com", password: 'test6661', role: "user" }
            const res = await request(app).post('/sign-up').send(user)
            expect(res.statusCode).toBe(409)
        })
    }) 
})
 */

/* describe("POST /sign-in", () => {

    describe("when passed a email , password and role", () => {
        it("should respond with a 200 status code", async () => {
            const res = await request(app).
                post("/sign-in").send({
                    email: "test@gmail.com",
                    password: "test6661",
                    role: 'user'
                })
            console.log(JSON.stringify(res.body))
            expect(res.statusCode).toBe(200)
        })
    })
     describe("when the email or password or role is missing", () => {
         it("should return a 422 status code to show there was a validation error", async () => {
             const res = await request(app).post("/sign-in").send({
                 email: "",
                 password: "test6661",
                 role: 'user'
             })
             expect(res.statusCode).toBe(422)
         })
     })
     describe("when the email or password or role is incorrect", () => {
         it("should return a 401 status code to show there was a Invalid Credentials error", async () => {
             const res = await request(app).post("/sign-in").send({
                 email: "test@gmail.com",
                 password: "test661",
                 role: 'user'
             })
             expect(res.statusCode).toBe(401)
         })
     }) 
})   */
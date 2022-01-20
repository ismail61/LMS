'use strict'
const request = require('supertest')
const app = require('../../api/app')
var mongoose = require('mongoose');

describe('Post /make-order', () => {
    describe("when passed a BookId", () => {
        it('should create a new order', async () => {
            const res = await request(app)
                .post('/user/make-order')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU2YTE1YTZmM2Q1ZTU3MDM2ZjMxYWYiLCJyb2xlIjoidXNlciIsInZlcmlmeVRva2VuIjoiNmY0Y2ZjNWZkZTE0YTU0MCIsImlhdCI6MTY0MjUyNjU4MSwiZXhwIjoxNjQyNjEyOTgxfQ.thYUDF6mcKsJsdz5WVc20CeH24CFjDnSEF-x5-4D6q0')
                .send({ bookId: mongoose.Types.ObjectId('4edd40c86762e0fb12000003') })
            console.log(JSON.stringify(res.body))
            expect(res.statusCode).toBe(201)
        }, 10000)
    })
    describe("when passed a fake BookId or BookId is missing", () => {
        it('should return a 404 status code to show there was a Not Found error', async () => {
            const res = await request(app)
                .post('/user/make-order')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU2YTE1YTZmM2Q1ZTU3MDM2ZjMxYWYiLCJyb2xlIjoidXNlciIsInZlcmlmeVRva2VuIjoiNmY0Y2ZjNWZkZTE0YTU0MCIsImlhdCI6MTY0MjUyNjU4MSwiZXhwIjoxNjQyNjEyOTgxfQ.thYUDF6mcKsJsdz5WVc20CeH24CFjDnSEF-x5-4D6q0')
                .send({ bookId: mongoose.Types.ObjectId('4edd40c86762e0fb12000003') })
            console.log(JSON.stringify(res.body))
            expect(res.statusCode).toBe(404)
        }, 10000)
    })
})
describe('DELETE /order/:orderId', () => {
    describe("when passed a orderId", () => {
        it('should delete a order', async () => {
            const res = await request(app)
                .patch(`/user/orders/${mongoose.Types.ObjectId('4edd40c86762e0fb12000003') }}`)
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU2YTE1YTZmM2Q1ZTU3MDM2ZjMxYWYiLCJyb2xlIjoidXNlciIsInZlcmlmeVRva2VuIjoiNmY0Y2ZjNWZkZTE0YTU0MCIsImlhdCI6MTY0MjUyNjU4MSwiZXhwIjoxNjQyNjEyOTgxfQ.thYUDF6mcKsJsdz5WVc20CeH24CFjDnSEF-x5-4D6q0')
                .send({})
            console.log(JSON.stringify(res.body))
            expect(res.statusCode).toBe(200)
        }, 10000)
    })
    describe("when passed a fake orderId or orderId is missing", () => {
        it('should return a 404 status code to show there was a Not Found error', async () => {
            const res = await request(app)
                .post(`/user/orders/${mongoose.Types.ObjectId('4edd40c86762e0fb12000003')}`)
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU2YTE1YTZmM2Q1ZTU3MDM2ZjMxYWYiLCJyb2xlIjoidXNlciIsInZlcmlmeVRva2VuIjoiNmY0Y2ZjNWZkZTE0YTU0MCIsImlhdCI6MTY0MjUyNjU4MSwiZXhwIjoxNjQyNjEyOTgxfQ.thYUDF6mcKsJsdz5WVc20CeH24CFjDnSEF-x5-4D6q0')
                .send({})
            console.log(JSON.stringify(res.body))
            expect(res.statusCode).toBe(404)
        }, 10000)
    })
    describe("when passed a orderId but order is already accepted or rejected", () => {
        it('should return a 409 status code to show there was a Conflict error', async () => {
            const res = await request(app)
                .post(`/user/orders/${mongoose.Types.ObjectId('4edd40c86762e0fb12000003')}`)
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU2YTE1YTZmM2Q1ZTU3MDM2ZjMxYWYiLCJyb2xlIjoidXNlciIsInZlcmlmeVRva2VuIjoiNmY0Y2ZjNWZkZTE0YTU0MCIsImlhdCI6MTY0MjUyNjU4MSwiZXhwIjoxNjQyNjEyOTgxfQ.thYUDF6mcKsJsdz5WVc20CeH24CFjDnSEF-x5-4D6q0')
                .send({})
            console.log(JSON.stringify(res.body))
            expect(res.statusCode).toBe(409)
        }, 10000)
    })
})

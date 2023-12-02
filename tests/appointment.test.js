import mongoose from "mongoose";
import app from "../express";
import request from "supertest"
import { generateToken } from "../utils/auth/jwt";
import UserModel from "../repository/model/user";
import AppointmentModel from "../repository/model/appointment";

const newUser = {
    name: 'Ali akbar',
    email: 'ali@gmail.com',
    password: '123456' 
}

let token = ''
let user = {}

beforeAll(async () => {
    await request(app).post('/register').send({ ...newUser })
    await UserModel.updateOne({ email: newUser.email }, { role: 'ADMIN' })
    user = await UserModel.findOne({ email: newUser.email })
    token = generateToken(user._id, user.email, user.role)
})

afterAll(async () => {
    await UserModel.deleteOne({ email: newUser.email })
    mongoose.disconnect()
})

test('Get Appointment', async () => {
    await request(app).
        get('/appointment').
        set('Authorization', token)
        expect(200)
})

describe('Appointment Creation and Deletion', () => {
    test('Create Appointment', async () => {
        await request(app).
            post('/appointment/create').
            set('Authorization', token).
            send({
                "doctorID": "654efc751fdf864ac934b1c9",
                "appointmentTime": "2023-11-26",
                "service": "Liver Problems"
            })
            expect(200) 
    })

    test('Delete Appointment', async () => {
        const appointment = await AppointmentModel.findOne({ userID: user._id })
        await request(app).
            delete(`/appointment/delete/${appointment._id}`).
            set('Authorization', token).
            expect(202)
    })

})
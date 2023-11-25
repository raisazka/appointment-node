import app from "../express";
import request from "supertest"
import UserModel from "../repository/model/user";
import mongoose from "mongoose";

const user = {
    name: 'Ali akbar',
    email: 'ali@gmail.com',
    password: '123456' 
}

afterAll(async () => {
    await UserModel.deleteOne({ email: user.email })
    mongoose.disconnect()
})

test('User Register', async () => {
    await request(app).
    post('/register').
    send(user).
    expect(200)
})

test('User Login', async () => {
    await request(app).
        post('/login').
        send({
            email: user.email,
            password: user.password,
        }).expect(200)
})
import mongoose from "mongoose";

const Address = new mongoose.Schema({
    city: {
        type: String
    },
    state: {
        type: String
    }
})

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    },
    phone: {
        type: String
    },
    age: {
        type: Number
    },
    healthScore: {
        type: Number
    },
    address: {
        type: Address,
    },
    hobbies: {
        type: [String]
    }
})

const UserModel = mongoose.model("user", User)

export default UserModel
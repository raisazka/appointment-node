import mongoose from "mongoose";

const Address = new mongoose.Schema({
    city: {
        type: String
    },
    state: {
        type: String
    }
})

const Customer = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
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

const CustomerModel = mongoose.model("customer", Customer)

export default CustomerModel
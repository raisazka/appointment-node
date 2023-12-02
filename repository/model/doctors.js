import mongoose from "mongoose";

const Service = new mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    }
})

const Doctor = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    service: [Service]
})

const DoctorModel = mongoose.model("doctor", Doctor)

export default DoctorModel
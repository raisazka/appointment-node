import mongoose from "mongoose";

const Appointment = new mongoose.Schema({
    doctorID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    appointmentTime: {
        type: Date
    }, 
    service: {
        type: String
    },
    evidence: {
        type: String
    }
})

const AppointmentModel = mongoose.model("appointment", Appointment)

export default AppointmentModel
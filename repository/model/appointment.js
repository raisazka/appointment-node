import mongoose from "mongoose";

const Appointment = new mongoose.Schema({
    doctorID: {
        type: mongoose.Types.ObjectId
    },
    userID: {
        type: mongoose.Types.ObjectId
    },
    appointmentTime: {
        type: Date
    }, 
    service: {
        type: String
    }
})

const AppointmentModel = mongoose.model("appointment", Appointment)

export default AppointmentModel
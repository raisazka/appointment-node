import AppointmentModel from "../model/appointment.js"
import mongoose from "mongoose"

class AppointmentRepository {

    add = (req) => {
        return AppointmentModel.create({
            userID: new mongoose.Types.ObjectId(req.userID),
            doctorID: new mongoose.Types.ObjectId(req.doctorID),
            appointmentTime: new Date(req.appointmentTime),
            service: req.service,
        })
    }

    get = (page, pageSize) => {
        return AppointmentModel.find()
        // -1 -> Descending
        // 1 -> Ascending
        .sort({ appointmentTime: -1 })
        // 
        // (page) 1 * (pageSize) 10 - (pageSize) 10
        // 0 -> di halaman pertama
        //
        .skip(page * pageSize - pageSize)
        .limit(pageSize)
    }

    getByID = (id) => {
        return AppointmentModel.findById(id)
    }

    update = (id, req) => {
        return AppointmentModel.updateOne({ _id: new mongoose.Types.ObjectId(id) } , {
            customerID: req.customerID,
            doctorID: req.doctorID,
            appointmentTime: new Date(req.appointmentTime),
            service: req.service
        })
    }

    delete = (id) => {
        return AppointmentModel.deleteOne({
            _id: new mongoose.Types.ObjectId(id)
        })
    }
}

export default AppointmentRepository
import DoctorModel from "../model/doctors.js"

class DoctorRepository {
    getByID = (id) => {
        return DoctorModel.findOne({
            _id: id
        })
    }
}

export default DoctorRepository
import appointmentSchema from '../utils/validator/appointment-validator.js'

// Separation of Concern

class AppointmentService {
    constructor(repo, custRepo, doctRepo) {
        this.repo = repo
        this.custRepo = custRepo
        this.doctRepo = doctRepo
    }

    // AddAppointment will store new appointment in appointment.js
    addAppointment = async (addAppointmentRequest, user) => {
        const { error } = appointmentSchema.validate(addAppointmentRequest, {
            abortEarly: true
        })
        if (error) {
            throw error
        }
        // gaenaknya, kita perlu ambil id dulu by email
        addAppointmentRequest.userID = user.userID
        return this.repo.add(addAppointmentRequest)
    }

    // readAppointment is to get data from appointment.json
    getAppointments = async (page, pageSize) => {
        const data = await this.repo.get(page, pageSize)
        
        //
        // 1. Collect customerID and doctorID
        // 2. Query IN (Where IN = ?)
        // 3. Baru kita mapping datanya berdasarkan ID
        //

        let response = []
        for(let i = 0; i < data.length; i++) {
            const user = await this.custRepo.getByID(data[i].userID)
            const doctor = await this.doctRepo.getByID(data[i].doctorID)
            response.push({
                id: data[i]._id,
                customer: {
                    name: user.name,
                    email: user.email,
                },
                doctor: doctor.name,
                appointmentTime: data[i].appointmentTime,
                service: data[i].service
            })
        }

        return response
    }

    deleteAppointmentsByID = async (deletedID) => {
        try {
            const data = await this.repo.getByID(deletedID)

            if (!data) throw new Error("No Data Found")

            return this.repo.delete(deletedID)
        } catch(err) {
            throw new Error(err)
        }
    }

    updateAppointmentsByID = async (updatedID, updateAppointmentRequest) => {
        const { error } = appointmentSchema.validate(updateAppointmentRequest, {
            abortEarly: true
        })
        if (error) throw error

        try {
            // Check data by id, if it's exists or not
            const data = await this.repo.getByID(updatedID)
            if (!data) throw new Error("No Data Found") 

            // Check customer data & doctor data if it's exists or not
            const customer = await this.custRepo.getByID(updateAppointmentRequest.customerID)
            const doctor = await this.doctRepo.getByID(updateAppointmentRequest.doctorID)
        
            if (!customer || !doctor) {
                throw new Error("Customer or Doctor data not found")
            }

            return this.repo.update(updatedID, updateAppointmentRequest)
        } catch (error) {
           throw error 
        }
    }
} 

export default AppointmentService
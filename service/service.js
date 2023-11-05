import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import appointmentSchema from '../utils/validator/appointment-validator.js'

const fileName = "appointment.json"
// Separation of Concern

class AppointmentService {
    // AddAppointment will store new appointment in appointment.js
    addAppointment = (addAppointmentRequest) => {
        let data = readFileToJSON()

        const { error } = appointmentSchema.validate(addAppointmentRequest, {
            abortEarly: true
        })

        if (error) {
            throw error
        }

        const { name, date, hour, doctorName, service } = addAppointmentRequest

        const dateF = new Date(date)
        // Push New Data to Array
        data.push(
            {
                id: uuidv4(),// uuid
                name: name,
                date: dateF,
                hour: hour,
                doctorName: doctorName,
                service: service,
            }
        )
    
        fs.writeFileSync(fileName, JSON.stringify(data))
    }

    // readAppointment is to get data from appointment.json
    getAppointments = () => {
        return readFileToJSON()
    }

    deleteAppointmentsByID = (deletedID) => {
        let data = readFileToJSON()
    
        // Filter buat nge remove data dengan id / attribute yang sama
       const filteredData = data.filter((d) => {
            return d.id !== deletedID
        })

        if (data.length === filteredData.length) {
            throw "Data Found"
        }
        
        fs.writeFileSync(fileName, JSON.stringify(filteredData))
    }

    updateAppointmentsByID = (updatedID, updateAppointmentRequest) => {
        let data = readFileToJSON()

        const { name, date, hour, doctorName, service } = updateAppointmentRequest
        const { error } = appointmentSchema.validate(updateAppointmentRequest, {
            abortEarly: true
        })

        if (error) {
            throw error
        }
        const found = false
        // for each buat looping
        data.forEach(element => {
            if (element.id === updatedID) {
                found = true

                element.name = name
                element.date = date
                element.hour = hour,
                element.doctorName = doctorName,
                element.service = service
            }
        });

        if (!found) throw "No Data Found"
    
        fs.writeFileSync(fileName, JSON.stringify(data))
    }
} 

//
// Helper function to read file
//
const readFileToJSON = () => {
    try {
        let appointments = fs.readFileSync(fileName)
    
        if (appointments.byteLength == 0) appointments = "[]"

        // Convert JSON String JSON Object in data variable
        return JSON.parse(appointments)
    } catch (err) {
       console.error(err); 
    }
    
}

export default AppointmentService
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const fileName = "appointment.json"

// Separation of Concern

class AppointmentService {
    // AddAppointment will store new appointment in appointment.js
    addAppointment = (name, date) => {
        let data = readFileToJSON()
        // Push New Data to Array
        data.push(
            {
                id: uuidv4(),// uuid
                name: name,
                date: date
            }
        )
    
        fs.writeFileSync(fileName, JSON.stringify(data))
    }

    // readAppointment is to get data from appointment.json
    getAppointments = () => {
        console.log(readFileToJSON());
    }

    deleteAppointmentsByID = (deletedID) => {
        let data = readFileToJSON()
    
        // Filter buat nge remove data dengan id / attribute yang sama
       const filteredData = data.filter((d) => {
            return d.id !== deletedID
        })
    
        fs.writeFileSync(fileName, JSON.stringify(filteredData))
    }

    updateAppointmentsByID = (updatedID, name, date) => {
        let data = readFileToJSON()
    
        // for each buat looping
        data.forEach(element => {
            if (element.id === updatedID) {
                element.name = name
                element.date = date
            }
        });
    
        fs.writeFileSync(fileName, JSON.stringify(data))
    }
} 

//
// Helper function to read file
//
const readFileToJSON = () => {
    let appointments = fs.readFileSync(fileName)
    
    if (appointments.byteLength == 0) appointments = "[]"

    // Convert JSON String JSON Object in data variable
    return JSON.parse(appointments)
}

export default AppointmentService
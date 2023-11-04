// const fs = require('fs')
import AppointmentService from './service/service.js'

// addAppointment("Ini Tanggal 4 Nov Hari Sabtu Mau booking Dong", "5 November")
// deleteAppointmentsByID("3a08a13f-2ce0-4d76-b746-c24abb755653")
// getAppointments()

const appointment = new AppointmentService()
appointment.updateAppointmentsByID("6342ff28-5301-4640-9fd5-587ca8a6f0a2", "Input Name Updated Class", "Input Date Updated Class")
appointment.getAppointments()
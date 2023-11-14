// const fs = require('fs')
import express from 'express'
import AppointmentService from './service/service.js'
import bodyParser from 'body-parser'
import AppointmentController from './controller/controller.js'
import routes from './routes/routes.js'
import connection from './utils/mongoose/connection.js'
import AppointmentRepository from './repository/impl/repository.js'
import CustomerRepository from './repository/impl/customer-repo.js'
import DoctorRepository from './repository/impl/doctor-repo.js'

const app = express()
// const router = express.Router()

// Middleware -> will explain di next session
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Init to MongoDB
connection()

const appointmentRepo = new AppointmentRepository()
const customerRepo = new CustomerRepository()
const doctorRepo = new DoctorRepository()

const svc = new AppointmentService(appointmentRepo, customerRepo, doctorRepo)
const controller = new AppointmentController(svc)

routes(app, controller)

app.listen(3000, function () {
    console.log("Server start on Port 3000");
})

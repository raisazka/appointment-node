// const fs = require('fs')
import express from 'express'
import AppointmentService from './service/service.js'
import bodyParser from 'body-parser'
import AppointmentController from './controller/controller.js'
import routes from './routes/routes.js'
import connection from './utils/mongoose/connection.js'
import AppointmentRepository from './repository/impl/repository.js'
import UserRepository from './repository/impl/user.js'
import DoctorRepository from './repository/impl/doctor-repo.js'
import AuthService from './service/auth.js'
import AuthController from './controller/auth.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
// const router = express.Router()

// Middleware -> will explain di next session
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Init to MongoDB
connection()

const appointmentRepo = new AppointmentRepository()
const userRepo = new UserRepository()
const doctorRepo = new DoctorRepository()

const svc = new AppointmentService(appointmentRepo, userRepo, doctorRepo)
const authSvc = new AuthService(userRepo)

const controller = new AppointmentController(svc)
const authController = new AuthController(authSvc)

routes(app, controller)
authRoutes(app, authController)

app.listen(3000, function () {
    console.log("Server start on Port 3000");
})

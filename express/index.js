// const fs = require('fs')
import express from 'express'
import AppointmentService from '../service/service.js'
import bodyParser from 'body-parser'
import AppointmentController from '../controller/controller.js'
import routes from '../routes/routes.js'
import connection from '../utils/mongoose/connection.js'
import AppointmentRepository from '../repository/impl/repository.js'
import UserRepository from '../repository/impl/user.js'
import DoctorRepository from '../repository/impl/doctor.js'
import AuthService from '../service/auth.js'
import AuthController from '../controller/auth.js'
import authRoutes from '../routes/authRoutes.js'
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware.js'
import multer from 'multer'

const app = express()
// const router = express.Router()

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        // 2MB max size
        fileSize: 2 * 1024 * 1024
    }
})

// Middleware -> will explain di next session
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multerMiddleware.single('file'))
app.use(errorHandlerMiddleware)

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

export default app

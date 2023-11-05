// const fs = require('fs')
import express from 'express'
import AppointmentService from './service/service.js'
import bodyParser from 'body-parser'
import AppointmentController from './controller/controller.js'
import routes from './routes/routes.js'

const app = express()
// const router = express.Router()

// Middleware -> will explain di next session
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const svc = new AppointmentService()
const controller = new AppointmentController(svc)

routes(app, controller)

app.listen(3000, function () {
    console.log("Server start on Port 3000");
})

class AppointmentController {
    // Dependency
    // AppointmentController -> AppointmentService
    constructor(appointmentService) {
        this.svc = appointmentService
    }
    // this.svc.addAppointment.then(() => {]}).catch()
    addAppointment = async (req, res, next) => {
        try {
            await this.svc.addAppointment(req.body, req.user)
            res.status(201).json({
                status: "success"
            })
        } catch (err) {
            console.error(`[AppointmentController] [addAppointment] err=${err}`)
            res.status(err.statusCode).json({
                error: err.message,
            })
        }
    }

    getAppointment = async (req, res, next) => {
        try {
            const { page, pageSize } = req.query
            const data = await this.svc.getAppointments(page, pageSize)
            res.send({
                data: data
            })
        } catch(err) {
            console.error(`[AppointmentController] [getAppointment] err=${err}`)
            res.status(err.statusCode).json({
                error: err.message,
            })
        }
    }

    updateAppointment = async (req, res, next) => {
        try {
            const id = req.params.id

            await this.svc.updateAppointmentsByID(id, req.body)
            res.send({
                status: "success"
            })
        } catch (error) {
            console.error(`[AppointmentController] [updateAppointment] err=${error}`)
            res.status(err.statusCode).json({
                error: err.message,
            })
        }
    }

    deleteAppointment = async (req, res, next) => {
        try {
            const id = req.params.id

            await this.svc.deleteAppointmentsByID(id)
            res.status(202).json({
                status: "success"
            })
        } catch (error) {
            console.error(`[AppointmentController] [deleteAppointment] err=${error}`)
            res.status(err.statusCode).json({
                error: err.message,
            })
        }
    }
}

export default AppointmentController
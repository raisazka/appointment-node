class AppointmentController {
    // Dependency
    // AppointmentController -> AppointmentService
    constructor(appointmentService) {
        this.svc = appointmentService
    }
    // this.svc.addAppointment.then(() => {]}).catch()
    addAppointment = async (req, res, next) => {
        try {
            await this.svc.addAppointment(req.body)
            res.send({
                status: "success"
            })
        } catch (err) {
            console.error(`[AppointmentController] [addAppointment] err=${err}`)
            res.send({
                error: err
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
            res.send({
                error: err.toString()
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
            res.send({
                error: error.toString()
            })
        }
    }

    deleteAppointment = async (req, res, next) => {
        try {
            const id = req.params.id

            await this.svc.deleteAppointmentsByID(id)
            res.send({
                status: "success"
            })
        } catch (error) {
            console.error(`[AppointmentController] [deleteAppointment] err=${error}`)
            res.send({
                error: error.toString()
            })
        }
    }
}

export default AppointmentController
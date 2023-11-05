class AppointmentController {
    // Dependency
    // AppointmentController -> AppointmentService
    constructor(appointmentService) {
        this.svc = appointmentService
    }

    addAppointment = (req, res, next) => {
        try {
            this.svc.addAppointment(req.body)
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

    getAppointment = (req, res, next) => {
        const data = this.svc.getAppointments()
        res.send({
            data: data
        })
    }

    updateAppointment = (req, res, next) => {
        try {
            const id = req.params.id

            this.svc.updateAppointmentsByID(id, req.body)
            res.send({
                status: "success"
            })
        } catch (error) {
            res.send({
                error: error
            })
        }
    }

    deleteAppointment = (req, res, next) => {
        try {
            const id = req.params.id

            this.svc.deleteAppointmentsByID(id)
            res.send({
                status: "success"
            })
        } catch (error) {
            res.send({
                error: error
            })
        }
    }
}

export default AppointmentController
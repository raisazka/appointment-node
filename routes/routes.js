import authMiddleware from "../middleware/authMiddleware.js"

export default (app, controller) => {
    app.get("/appointment", authMiddleware, controller.getAppointment)
    app.post("/appointment/create", authMiddleware, controller.addAppointment)
    app.patch("/appointment/update/:id", authMiddleware, controller.updateAppointment)
    app.delete("/appointment/delete/:id", authMiddleware, controller.deleteAppointment)
}
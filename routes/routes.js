export default (app, controller) => {
    app.get("/appointment", controller.getAppointment)
    app.post("/appointment/create", controller.addAppointment)
    app.patch("/appointment/update/:id", controller.updateAppointment)
    app.delete("/appointment/delete/:id", controller.deleteAppointment)
}
export default (app, controller) => {
    app.post("/login", controller.login)
    app.post("/register", controller.register)
}
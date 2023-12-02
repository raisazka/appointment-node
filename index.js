import app from './express/index.js'

const port = process.env.PORT || 8000

app.listen(port, function () {
    console.log("Server start on Port 80");
})

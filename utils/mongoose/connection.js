import mongoose from "mongoose";

export default () => {
   const connection = mongoose.connect("mongodb://127.0.0.1:27017/clinic_appointment", {
        connectTimeoutMS: 1000,
   })

   //
   //   "connected" -> ketika udah connect dbnya
   //   "reconnected" -> ketika sedang reconnect
   //   "error" -> ini ketika mongoose gabisa connect ke DB / ada error di DB nya
   //

   mongoose.connection.on("connected", () => {
        console.info("Connected to database clinic_appointment")
   })

   mongoose.connection.on("reconnected", () => {
    console.info("Reconnected to database clinic_appointment")
   })

   mongoose.connection.on("error", (err) => {
        console.error(`Error while connecting to database: ${err}`)
        //
        // Karena Error, maka kita ada disconnect dari MongoDB
        // Takutnya ada Connection Buffer -> Additional memory untuk aplikasi
        // yang sebenernya gak kita pake juga
        //
        mongoose.disconnect()
   })

   return connection
}
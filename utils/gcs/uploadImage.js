// upload image helper
import gcs from './gcs.js'

const bucket = gcs.bucket('appointment-node-gcs')

export default (file) => new Promise((resolve, reject) => {
    // original name dan buffer
    const { originalname, buffer } = file
    // init file to gcs
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    // write to gcs by stream
    const blobStream = blob.createWriteStream({
        resumable: false,
    })
    // call the callback function
    // "error", "finish"
    blobStream.on("finish", () => {
        const format = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        resolve(format)
    }).on("error", (err) => {
        console.error(`[uploadImage] err=Unable to upload image: ${err} `)
        reject(`[uploadImage] err=Unable to upload image: ${err}`)
    }).end(buffer)
})
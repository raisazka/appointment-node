// init GCS

import { Storage } from '@google-cloud/storage'
import { resolve } from 'path'

const serviceKey = resolve('gcs-key.json')

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'rais-freelance'
})

export default storage
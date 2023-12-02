class BaseError extends Error {
    // statusCode, message
    constructor(statusCode, message) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = Error.name
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }
}

export default BaseError
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const JWT_SECRET = "jwtsecret"

const compare = (password, hashedPassword) => 
    bcrypt.compareSync(password, hashedPassword)


const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

// verify jwt token
const verify = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

const generateToken = (userID, email, role) => {
    return jwt.sign({ userID, email, role }, JWT_SECRET, {
        expiresIn: 3600000,
    })
}

export {
    compare,
    encryptPassword,
    verify,
    generateToken
}
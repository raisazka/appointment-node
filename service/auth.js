// Domain Auth

import { compare, encryptPassword, generateToken } from "../utils/auth/jwt.js"
import { loginSchema, registerSchema } from "../utils/validator/auth-validator.js"
import BaseError from "../utils/error/error.js"
// Then, it needs to be separated
class AuthService {
    constructor(repo) {
        this.repo = repo
    }

    login = async (loginReq) => {
        // validate request using joi
        const { error } = loginSchema.validate(loginReq, {
            abortEarly: true
        })
        if (error) throw new BaseError(400, error)

        // get user by email
        // validate if user exists / gak
        const user = await this.repo.getByEmail(loginReq.email)
        if (!user) throw new BaseError(500, "User doesn't exists")

        // compare password 
        // apakah matched / gak
        const matched = compare(loginReq.password, user.password)
        if (!matched) throw new BaseError(401, "Password doesn't matched")
        console.log("User ID",user._id);
        // send token -> generated by jwt
        return generateToken(user._id, user.email, user.role)
    }

    register = async (registerReq) => {
        // validate request using joi
        const { error } = registerSchema.validate(registerReq, {
            abortEarly: true
        })

        if (error) throw new BaseError(400, error) 

        // check if user udah exists / gak by email
        // kalo udah exists error karena gak mungkin ada 2 email yg sama
        const user = await this.repo.getByEmail(registerReq.email)
        if (user) throw new BaseError(500, "User already exists with the email")

        // encrypt password
        const hashed = encryptPassword(registerReq.password)
        registerReq.password = hashed
        // save user ke database
        const generatedUser = await this.repo.add(registerReq)

        return generateToken(generatedUser._id, registerReq.email, generatedUser.role)
    }
}

export default AuthService
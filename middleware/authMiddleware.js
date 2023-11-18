import { verify } from "../utils/auth/jwt.js"
import BaseError from "../utils/error/error.js"


export const adminAuthMiddleware = (req, res, next) => {
    const token = getAuthorizationHeader(req, res)

    try {
        const usr = verify(token)
        req.user = usr

        if (usr.role !== "ADMIN") 
            throw new BaseError(401, `Unauthorized Access for Role: ${usr.role}`)
        // meneruskan request ke next layer a.k.a app
        next()
    } catch(err) {
        res.status(401).json({
            error: `Error: ${err}`
        })
    } 
}

export const authMiddleware = (req, res, next) => {
    // request header -> Authorization
    const token = getAuthorizationHeader(req, res)
    // verify token
    try {
        const usr = verify(token)
        req.user = usr
        // meneruskan request ke next layer a.k.a app
        next()
    } catch(err) {
        res.send({
            error: `Error: ${err}`
        })
    }
}

const getAuthorizationHeader = (req, res) => {
    const token = req.header("Authorization")
    // cek dulu apakah si header Authorization
    // kosong / gak
    // Bearer -> prefix
    if (!token) {
        console.error("[AuthMiddleware] Token is not filed")
        res.status(401).json({ error: "Token is not filled" }) 
        return
    }

    return token
}
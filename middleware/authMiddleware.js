import { verify } from "../utils/auth/jwt.js"

export default (req, res, next) => {
    // request header -> Authorization
    const token = req.header("Authorization")
    // cek dulu apakah si header Authorization
    // kosong / gak
    // Bearer -> prefix
    if (!token) {
        console.error("[AuthMiddleware] Token is not filed")
        res.send({ error: "Token is not filled" }) 
        return
    }  
    // verify token
    try {
        const decoded = verify(token)
        req.user = decoded
        // meneruskan request ke next layer a.k.a app
        next()
    } catch(err) {
        res.send({
            error: `Error: ${err}`
        })
    }
}
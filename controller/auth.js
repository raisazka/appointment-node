class AuthController {
    constructor(svc) {
        this.svc = svc
    }

    login = async (req, res, next) => {
        try {
            const token = await this.svc.login(req.body)
            res.send({
                access_token: token
            })
        } catch(err) {
            console.error(`[AuthController][login] error:${err}`)
            res.send({
                error: err.toString()
            })
        }
    }

    register = async (req, res, next) => {
        try {
            const token = await this.svc.register(req.body)
            res.send({
                access_token: token
            })
        } catch(err) {
            console.error(`[AuthController][register] error:${err}`)
            res.send({
                error: err.toString()
            })
        } 
    }
}

export default AuthController
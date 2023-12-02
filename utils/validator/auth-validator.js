import Joi from "joi"

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const registerSchema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required() 
})

export { loginSchema, registerSchema }
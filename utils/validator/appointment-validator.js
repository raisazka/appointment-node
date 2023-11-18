import Joi from 'joi';

const appointmentSchema = Joi.object({
    appointmentTime: Joi.date().greater(Date.now()).required(),
    doctorID: Joi.string().required(),
    service: Joi.string().required()
})

export default appointmentSchema
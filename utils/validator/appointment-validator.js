import Joi from 'joi';

const appointmentSchema = Joi.object({
    customerID: Joi.string().required(),
    appointmentTime: Joi.date().greater(Date.now()).required(),
    doctorID: Joi.string().required(),
    service: Joi.string().required()
})

export default appointmentSchema
import Joi from 'joi';

const appointmentSchema = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().greater(Date.now()).required(),
    hour: Joi.string().regex(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")).required(),
    doctorName: Joi.string().required(),
    service: Joi.string().required()
})

export default appointmentSchema
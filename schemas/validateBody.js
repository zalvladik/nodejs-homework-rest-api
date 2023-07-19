import Joi from 'joi'

const phoneNumberValid = /^\(\d{3}\) \d{3}-\d{4}$/


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phoneNumberValid).required(),
})

const schems = {
    addSchema
}

export default schems
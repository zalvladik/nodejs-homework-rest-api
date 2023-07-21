import fs from 'fs/promises'
import path from 'path'
import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js';
import Joi from 'joi'

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  }
},{versionKey: false})

contactSchema.post("save",handleMongooseError)

const phoneNumberValid =/^\(\d{3}\) \d{3}-\d{4}$/

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneNumberValid).required(),
  favorite: Joi.boolean(),
})

export const Contact = model('contact', contactSchema)




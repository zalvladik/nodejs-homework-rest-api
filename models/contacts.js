// const fs = require('fs/promises')

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError'
import Joi from 'joi'

const contactSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    token: String
  },{versionKey: false})

contactSchema.post( "save", handleMongooseError)

const phoneNumberValid =/^\(\d{3}\) \d{3}-\d{4}$/

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneNumberValid).required(),
  owner: Joi.string().required(),
})

export const Contact = model('contact', contactSchema)
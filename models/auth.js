import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js'
import Joi from 'joi'

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const authSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minLength:6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match:emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token:String,
  },{versionKey: false})

authSchema.post( "save", handleMongooseError)

export const joiShecmaAuth = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

export const joiShecmaVerifi = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

export const Auth = model('auth', authSchema)
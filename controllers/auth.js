import { Auth } from "../models/auth.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import gravatar from 'gravatar'
import path from "path";
import fs from 'fs/promises'
import Jimp from "jimp";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const SECRET_KEY = '}.2oe2k>66PjUP8{sN)0kuaSk:QpYa'

const avatarsDir = path.join('public', 'avatars')

const {BASE_URL} = process.env

const register = async (req, res, next) => {
   
    try {
      const {email, password} = req.body
      const user = await Auth.findOne({email})
      if(user){
        return res.status(409).send({ message: "Email in use" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt)
      const avatarURL = gravatar.url(email)
      const verificationToken = nanoid()

      const newUser = await Auth.create({...req.body, password:hashPassword, avatarURL, verificationToken})

      const verifyEmail ={
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
      }

      await sendEmail(verifyEmail)

      res.status(201).send({
        user:{
          email: newUser.email,
          password: newUser.password,
        }
      })
    } catch (error) {
        res.status(400).send({ message: "Помилка від Joi або іншої бібліотеки валідації" });
    }
    
}

const login = async (req, res, next) => {

  try {
    const {email, password} = req.body
    const user = await Auth.findOne({email})
      if(!user){
        return res.status(401).send({ message: "Email or password invalid!" });
      }

      if(!user.verify){
        return res.status(401).send({ message: "Email not verified" });
      }
    
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'})
    await Auth.findByIdAndUpdate(user._id, {token})

    res.status(200).send({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      }
    })
  } catch (error) {
    return res.status(400).send({message: 'Помилка від Joi або іншої бібліотеки валідації'})
  }
}

const current = async (req, res, next) => {
   
  try {
    const {_id: owner} = req.user
    const currentUser = await Auth.findById(owner)
    res.status(200 ).send({
      user:{
        email: currentUser.email,
        subscription: currentUser.subscription,
      }
    })
  } catch (error) {
      res.status(400).send({ message: "Not authorized" });
  }
  
}

const logout = async (req, res, next) => {
   
  try {
    const {_id} = req.user
  
    await Auth.findByIdAndUpdate(_id, {token: ""})

    res.status(204).send({message: "logout success" })
  } catch (error) {
    res.status(400).send({message: "Not authorized" });
  }
  
}

const updateAvatar = async (req , res) => {
    try {
        const {_id} = req.user
        const {path: tempUpload, originalname} = req.file
        const filename = `${_id}_${originalname}`
        const resultUpload = path.join(avatarsDir, filename);

        const img = await Jimp.read(`./tmp/${originalname}`);
        img.resize(250, 250);
        img.writeAsync(`./tmp/${originalname}`);
        await fs.rename(tempUpload, resultUpload); 
        const avatarURL = path.join("avatars", filename)
        await Auth.findByIdAndUpdate(_id, {avatarURL})

        res.status(200).json({avatarURL})
    } catch (error) {
        res.status(401).send({message: "Not authorized"})
    }
}

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params
    const user = await Auth.find({verificationToken})

    if(!user){
      return res.status(400).send({message: 'User not found'})
    }

    await Auth.findByIdAndUpdate(user.id, {verify:true, verificationToken: ''})

    return res.status(200).send({message: 'Verification successful'})
  } catch (error) {
      return res.status(400).send({message: 'User not found'})
  }
}

const resendVerifyEmail = async (req, res) => {
  try {
    const {email} = req.body
    const user = await Auth.find({email})

    if(!user){
      return res.status(401).send({message: 'User not found'})
    }

    if(user.verify){
      return res.status(200).send({message: 'User already verify'})
    }

    const verifyEmail ={
      to: email,
      subject: 'Verify email',
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
    }

    await sendEmail(verifyEmail)

    return res.status(200).send({message: 'Verify email send success'})
  } catch (error) {
    return res.status(400).send({message: 'Verification has already been passed'})
  }
}

const ctrl = {
  register,
  login,
  current,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
}

export default ctrl
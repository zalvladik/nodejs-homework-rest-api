import { Auth } from "../models/auth.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const SECRET_KEY = '}.2oe2k>66PjUP8{sN)0kuaSk:QpYa'

const register = async (req, res, next) => {
   
    try {
      const {email, password} = req.body
      const user = await Auth.findOne({email})
      if(user){
        return res.status(409).send({ message: "Email in use" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt)

      const newUser = await Auth.create({...req.body, password:hashPassword})
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

const ctrl = {
  register,
  login,
  current,
  logout,
}

export default ctrl
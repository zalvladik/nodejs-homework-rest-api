import jwt from 'jsonwebtoken'
import { Auth } from "../models/auth.js";

const SECRET_KEY = '}.2oe2k>66PjUP8{sN)0kuaSk:QpYa'

const authenticate = async (req,res,next) => {

    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ")
    if(bearer !== "Bearer") {
        return (res.status(401).send({message: 'Not authorized'}))
    }

    try {
        const {id} = jwt.verify(token, SECRET_KEY)
        const user = await Auth.findById(id)

        if(!user || !user.token || user.token !== token){
            return (res.status(401).send({message: 'Not authorized'}))
        }

        req.user = user
        next()
    } catch {
        return (res.status(401).send({message: 'Not authorized'}))
    }
}

export default authenticate
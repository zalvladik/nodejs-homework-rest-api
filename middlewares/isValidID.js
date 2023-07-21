import { isValidObjectId } from "mongoose";
import HttpError from "./HttpError.js";

const isValidId = (req, res, next) =>{
    const {contactId} = req.params
    if(!isValidObjectId(contactId)) {
        next(HttpError(400, `${contactId} is not valid id`))
        
    }
    next()
}

export default isValidId
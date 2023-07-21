import { isValidObjectId } from "mongoose";
import mw from "./index.js";

const isValidId = (req, res, next) =>{
    const {contactId} = req.params
    if(!isValidObjectId(contactId)) {
        next(mw.HttpError(400, `${contactId} is not valid id`))
    }
    next()
}

export default isValidId
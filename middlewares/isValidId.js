import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) =>{
    const {contactId} = req.params
    if(!isValidObjectId(contactId)) {
        return (res.status(400).send({ message: `${contactId} is not valid id` }))
    }
    next()
}

export default isValidId
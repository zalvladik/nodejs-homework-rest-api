import { Contact } from '../models/contacts.js'
import mw from '../middlewares/index.js'

const getAll = async (req, res, next) => {
    const result = await Contact.find()
    if(!result){
        throw mw.HttpError(404, 'Not Found')
      }

    res.status(200).json(result)
}

const getById = async (req, res, next) => {
    const {contactId} = req.params
    const result = await Contact.findById(contactId)
    if(!result){
        throw mw.HttpError(404, "Not Found")
      }
  
    res.status(200).json(result)
}

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body)
    if(!result){
        throw mw.HttpError(400, 'missing required name field')
      }
  
    res.status(201).json(result)
}

const deleteById = async (req, res, next) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if(!result){
        throw mw.HttpError(404,'Not found')
      }  
  
    res.status(200).json(result)
}

const updateById = async (req, res, next) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if(!result){
        throw mw.HttpError(404,'Not found') 
      }  

    res.status(200).json(result)
}

const ctrl = {
    getAll,
    getById,
    addContact,
    deleteById,
    updateById
}

export default ctrl
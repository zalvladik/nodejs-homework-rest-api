import { Contact } from '../models/contacts.js'

const listContacts = async (req, res, next) => {
  try {
        const {_id: owner} = req.user
        const result = await Contact.find({owner})

    res.status(200).json(result)
    } catch (error) {
        return res.status(404).send({ message: "Contact not found!" });
    }
}

const getById = async (req, res, next) => {

  try {
    const {contactId} = req.params
    const result = await Contact.findById(contactId)
    if(!result){
        return res.status(404).send({ message: "Contact not found!" });
      }
  
    res.status(200).json(result) 
    } catch (error) {
        return res.status(404).send({ message: "Contact not found!" });
  }
}

const addContact = async (req, res, next) => {
  try {
    const {_id: owner} = req.user
    const result = await Contact.create({...req.body, owner})
  
    res.status(201).json(result)
  } catch (error) {
      return res.status(400).send({ message: "Missing required name field!" });
  }
}

const removeContact = async (req, res, next) => {

  try {
    const {contactId} = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if(!result){
        return res.status(404).send({ message: "Contact not found!" });
      }  
  
    res.status(200).json(result)
  } catch (error) {
        return res.status(404).send({ message: "Contact not found!" });
  }
}

const updateContact  = async (req, res, next) => {

  try {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if(result === null){
        return res.status(404).send({ message: "Contact not found" }); 
      }  

    res.status(200).json(result)
  } catch (error) {
      
  }
}

const updateContactFavorite  = async (req, res, next) => {

  try {
    const {contactId} = req.params
    const checkFavorite = {
        favorite:req.body.favorite
      }
      const result = await Contact.findByIdAndUpdate(contactId, checkFavorite,{new: true})
      if(result === null){
          return res.status(404).send({ message: "Contact not found" });
        }
      
      res.status(200).json(result)

  } catch (error) {
    return res.status(400).send({ message: "Missing field favorite!" });
  }
} 

const ctrl = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateContactFavorite,
}

export default ctrl
import express from 'express'
import todoActions from '../../models/contacts.js'
import schems from '../../schemas/validateBody.js'

const {addSchema} = schems

const router = express.Router()

const HttpError = (status, message) => {
  const error = new Error(message)
  error.status = status
  return error
}

router.get('/', async (req, res, next) => {
  try {
    const result = await todoActions.listContacts()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await todoActions.getContactById(contactId)

    if(!result){
      throw HttpError(404, "Not Found")
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)

    if(error){
      throw HttpError(400, 'missing required name field')
    }

    const result = await todoActions.addContact(req.body)

    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await todoActions.removeContact(contactId)

    if(!result){
      throw HttpError(404,'Not found')
    }
    
    res.status(200).json({"message": "contact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)

    if(error){
      throw HttpError(400,'missing fields')
    }

    const {contactId} = req.params
    const result = await todoActions.updateContact(contactId, req.body)

    if(!result){
      throw HttpError(404,'Not found') 
    }

    res.status(200).json({"message": "contact update"})
  } catch (error) {
    next(error) 
  }
})

export default router

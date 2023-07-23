import express from 'express'
import ctrl from '../../controllers/contacts.js'
import mw from '../../middlewares/index.js'
import { joiContactSchema } from '../../models/contacts.js'

const {authenticate, isValidId, validateBody} = mw

const router = express.Router() 

router.get('/', authenticate, ctrl.listContacts) //✔️

router.get('/:contactId', authenticate, isValidId, ctrl.getById) //✔️

router.post('/', authenticate, validateBody(joiContactSchema), ctrl.addContact) //✔️

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact) //✔️

router.put('/:contactId', authenticate, validateBody(joiContactSchema), ctrl.updateContact) //✔️

router.patch('/:contactId/favorite', authenticate, ctrl.updateContactFavorite) //✔️ 


export default router
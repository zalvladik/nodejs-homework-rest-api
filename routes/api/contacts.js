import express from 'express'
import ctrl from '../../controllers/contacts.js'
import mw from '../../middlewares/index.js'
import { addSchema } from '../../models/contacts.js'

const router = express.Router()

router.get('/', ctrl.getAll )

router.get('/:contactId', mw.isValidId, ctrl.getById)

router.post('/', mw.validateBody(addSchema), ctrl.addContact)

router.delete('/:contactId', mw.isValidId, ctrl.deleteById)

router.put('/:contactId', mw.validateBody(addSchema), ctrl.updateById)


export default router



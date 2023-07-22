const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

import ctrl from '../../controllers/contacts.js'
import mw from '../../middlewares/index.js'
import { addSchema } from '../../models/contacts.js'
import express from 'express'

const router = express.Router() 

router.get('/', ctrl.listContacts) //✔️

router.get('/:contactId', mw.isValidId, ctrl.getById) //✔️

router.post('/', mw.validateBody(addSchema), ctrl.addContact) //✔️

router.delete('/:contactId', mw.isValidId, ctrl.removeContact) //✔️

router.put('/:contactId', mw.validateBody(addSchema), ctrl.updateContact) //✔️

router.patch('/:contactId/favorite', ctrl.updateContactFavorite) //✔️


export default router

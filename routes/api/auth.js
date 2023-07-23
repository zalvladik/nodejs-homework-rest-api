import mw from '../../middlewares/index.js'
import { joiShecmaAuth } from '../../models/auth.js'
import express from 'express'
import ctrl from '../../controllers/auth.js' 

const {validateBody, authenticate} = mw

const router = express.Router() 

//✔️ ❌

router.post("/register", validateBody(joiShecmaAuth), ctrl.register) //✔️

router.post ("/login", validateBody(joiShecmaAuth), ctrl.login) //✔️

router.get ("/current", authenticate, ctrl.current) //✔️

router.post ("/logout", authenticate, ctrl.logout) //✔️

export default router

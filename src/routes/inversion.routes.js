import {Router} from 'express'
import {createInversion, getInversion} from '../controllers/inversion.controllers.js'

const router = Router()

router.post('/inversion', createInversion)

router.get('/inversion', getInversion)

export default router
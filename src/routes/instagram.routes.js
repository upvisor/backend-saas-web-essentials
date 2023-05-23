import {Router} from 'express'
import { createMessage } from '../controllers/instagramMessage.controllers.js'

const router = Router()

router.post('/instagram', createMessage)

export default router
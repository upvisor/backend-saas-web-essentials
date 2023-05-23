import {Router} from 'express'
import { createMessage } from '../controllers/messengerMessages.controllers.js'

const router = Router()

router.post('/messenger', createMessage)

export default router
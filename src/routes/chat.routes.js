import {Router} from 'express'
import { responseMessage, getMessages } from '../controllers/chat.controllers.js'

const router = Router()

router.post('/chat', responseMessage)

router.get('/chat/:id', getMessages)

export default router
import {Router} from 'express'
import { responseMessage, getMessages, createMessage } from '../controllers/chat.controllers.js'

const router = Router()

router.post('/chat', responseMessage)

router.get('/chat/:id', getMessages)

router.post('/chat/create', createMessage)

export default router
import {Router} from 'express'
import { responseMessage, getMessages, createMessage, getIds, editMessage } from '../controllers/chat.controllers.js'

const router = Router()

router.post('/chat', responseMessage)

router.get('/chat', getIds)

router.get('/chat/:id', getMessages)

router.post('/chat/create', createMessage)

router.put('/chat/:id', editMessage)

export default router
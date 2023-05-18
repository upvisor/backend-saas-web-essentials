import {Router} from 'express'
import { getPhones, getMessagesPhone, newMessage } from '../controllers/whatsappMessages.js'

const router = Router()

router.get('/whatsapp', getPhones)

router.get('/whatsapp/:id', getMessagesPhone)

router.post('/whatsapp', newMessage)

export default router
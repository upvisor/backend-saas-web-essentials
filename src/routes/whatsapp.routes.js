import {Router} from 'express'
import { getPhones, getMessagesPhone } from '../controllers/whatsappMessages.js'

const router = Router()

router.get('/whatsapp', getPhones)

router.get('/whatsapp/:id', getMessagesPhone)

export default router
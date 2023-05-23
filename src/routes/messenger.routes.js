import {Router} from 'express'
import { createMessage, getMessagesMessenger, getMessengerIds } from '../controllers/messengerMessages.controllers.js'

const router = Router()

router.get('/messenger', getMessengerIds)

router.get('/messenger/:id', getMessagesMessenger)

router.post('/messenger', createMessage)

export default router
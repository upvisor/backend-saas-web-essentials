import {Router} from 'express'
import { createMessage, getMessagesMessenger, getMessengerIds, viewMessage, saveMessage } from '../controllers/messengerMessages.controllers.js'

const router = Router()

router.get('/messenger', getMessengerIds)

router.get('/messenger/:id', getMessagesMessenger)

router.post('/messenger', createMessage)

router.put('/messenger/:id', viewMessage)

router.post('/messenger/save', saveMessage)

export default router
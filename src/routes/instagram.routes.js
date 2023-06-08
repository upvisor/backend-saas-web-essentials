import {Router} from 'express'
import { createMessage, getInstagramIds, getMessagesInstagram, viewMessage, saveMessage } from '../controllers/instagramMessage.controllers.js'

const router = Router()

router.get('/instagram', getInstagramIds)

router.get('/instagram/:id', getMessagesInstagram)

router.post('/instagram', createMessage)

router.put('/instagram/:id', viewMessage)

router.post('/instagram/save', saveMessage)

export default router
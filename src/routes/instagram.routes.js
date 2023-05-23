import {Router} from 'express'
import { createMessage, getInstagramIds, getMessagesInstagram } from '../controllers/instagramMessage.controllers.js'

const router = Router()

router.get('/instagram', getInstagramIds)

router.get('/instagram/:id', getMessagesInstagram)

router.post('/instagram', createMessage)

export default router
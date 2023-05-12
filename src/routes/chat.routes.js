import {Router} from 'express'
import { responseMessage } from '../controllers/chat.controllers.js'

const router = Router()

router.post('/chat', responseMessage)

export default router
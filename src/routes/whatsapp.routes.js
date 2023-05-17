import {Router} from 'express'
import { getMessages } from '../controllers/whatsappMessages.js'

const router = Router()

router.get('/whatsapp', getMessages)

export default router
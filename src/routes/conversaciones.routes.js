import {Router} from 'express'
import {createConversacion, getConversacion} from '../controllers/conversacion.controllers.js'

const router = Router()

router.post('/chat', createConversacion)

router.get('/chat/:userId', getConversacion)

export default router
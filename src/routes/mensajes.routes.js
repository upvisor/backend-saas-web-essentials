import {Router} from 'express'
import {createMensaje, getMensajes} from '../controllers/mensajes.controllers.js'

const router = Router()

router.post('/mensaje', createMensaje)

router.get('/mensaje/:conversacionId', getMensajes)

export default router
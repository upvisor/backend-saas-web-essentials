import {Router} from 'express'
import {createMensaje, getMensajes} from '../controllers/contacto.controllers.js'

const router = Router()

router.post('/mensajes', createMensaje)

router.get('/mensajes', getMensajes)

export default router
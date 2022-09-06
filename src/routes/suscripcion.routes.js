import {Router} from 'express'
import {createSuscripcion, getSuscripcion} from '../controllers/suscripcion.controllers.js'

const router = Router()

router.post('/suscripciones', createSuscripcion)

router.get('/suscripciones', getSuscripcion)

export default router
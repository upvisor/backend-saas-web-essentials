import {Router} from 'express'
import {createFinalizar, getFinalizar} from '../controllers/finalizar.controllers.js'

const router = Router()

router.post('/finalizar-compra', createFinalizar)

router.get('/finalizar-compra', getFinalizar)

export default router
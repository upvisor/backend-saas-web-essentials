import { Router } from 'express'
import { createPay } from '../controllers/mercadopago.controllers.js'

const router = Router()

router.post('/process_payment', createPay)

export default router
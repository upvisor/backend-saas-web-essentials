import { Router } from 'express'
import { createPayment, getPayment } from '../controllers/payments.controllers.js'

const router = Router()

router.post('/payment', createPayment)

router.get('/payment', getPayment)

export default router
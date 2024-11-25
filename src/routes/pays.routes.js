import { Router } from 'express'
import { createPay, getPay, getPays, getPayEmailService } from '../controllers/pays.controllers.js'

const router = Router()

router.post('/pay', createPay)

router.get('/pays', getPays)

router.get('/pay/:id', getPay)

router.get('/pay-email/:id', getPayEmailService)

export default router
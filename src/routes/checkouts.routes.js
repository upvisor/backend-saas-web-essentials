import { Router } from 'express'
import { viewCheckout } from '../controllers/checkouts.controllers.js'

const router = Router()

router.post('/checkout', viewCheckout)

export default router
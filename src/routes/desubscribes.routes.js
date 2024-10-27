import { Router } from 'express'
import { desubscribeClient } from '../controllers/desubscribes.controllers.js'

const router = Router()

router.get('/desubscribe/:email', desubscribeClient)

export default router
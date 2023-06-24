import { Router } from 'express'
import { createAutomatization, getAutomatizations } from '../controllers/automatizations.controllers.js'

const router = Router()

router.post('/automatization', createAutomatization)

router.get('/automatizations', getAutomatizations)

export default router
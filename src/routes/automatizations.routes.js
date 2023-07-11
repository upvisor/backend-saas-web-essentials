import { Router } from 'express'
import { createAutomatization, getAutomatizations, getAutomatization } from '../controllers/automatizations.controllers.js'

const router = Router()

router.post('/automatization', createAutomatization)

router.get('/automatizations', getAutomatizations)

router.get('/automatization/:id', getAutomatization)

export default router
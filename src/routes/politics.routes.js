import { Router } from 'express'
import { createPolitics, getPolitics } from '../controllers/politics.controllers.js'

const router = Router()

router.post('/politics', createPolitics)

router.get('/politics', getPolitics)

export default router
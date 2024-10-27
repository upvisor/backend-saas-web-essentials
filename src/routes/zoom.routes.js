import { Router } from 'express'
import { createToken } from '../controllers/zoom.controllers.js'

const router = Router()

router.get('/zoom-token', createToken)

export default router
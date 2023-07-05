import { Router } from 'express'
import { createDesign, getDesign } from '../controllers/design.controllers.js'

const router = Router()

router.post('/design', createDesign)

router.get('/design', getDesign)

export default router
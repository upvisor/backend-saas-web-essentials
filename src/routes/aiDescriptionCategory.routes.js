import {Router} from 'express'
import { createDescription } from '../controllers/aiDescriptionCategory.js'

const router = Router()

router.post('/ai-description-category', createDescription)

export default router
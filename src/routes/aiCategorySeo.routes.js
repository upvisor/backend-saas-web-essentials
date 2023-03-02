import {Router} from 'express'
import { createSeo } from '../controllers/aiCategorySeo.controllers.js'

const router = Router()

router.post('ai-category-seo', createSeo)

export default router
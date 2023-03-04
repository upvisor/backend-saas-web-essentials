import {Router} from 'express'
import { createTitleSeo } from '../controllers/aiTitleProductSeo.controllers.js'

const router = Router()

router.post('/ai-title-product-seo', createTitleSeo)

export default router
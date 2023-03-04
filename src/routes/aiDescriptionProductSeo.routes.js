import {Router} from 'express'
import { createDescriptionSeo } from '../controllers/aiDescriptionProductSeo.controllers.js'

const router = Router()

router.post('/ai-description-product-seo', createDescriptionSeo)

export default router
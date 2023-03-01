import {Router} from 'express'
import { createSeo } from '../controllers/aiProductSeo.js'

const router = Router()

router.post('ai-product-seo', createSeo)

export default router
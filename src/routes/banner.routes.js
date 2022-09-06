import {Router} from 'express'
import {createBanner, getBanner} from '../controllers/banner.controllers.js'

const router = Router()

router.post('/banner', createBanner)

router.get('/banner', getBanner)

export default router
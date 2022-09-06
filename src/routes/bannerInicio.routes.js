import {Router} from 'express'
import {createBannerInicio, getBannerInicio} from '../controllers/bannerInicio.controllers.js'

const router = Router()

router.post('/diseno', createBannerInicio)

router.get('/diseno', getBannerInicio)

export default router

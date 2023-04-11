import {Router} from 'express'
import {createPromotionalCode, getPromotionalCodes, getPromotionalCodeBySlug, updatePromotionalCode} from '../controllers/promotionalCode.controllers.js'

const router = Router()

router.post('/promotional-code', createPromotionalCode)

router.get('/promotional-code', getPromotionalCodes)

router.get('/promotional-code/:id', getPromotionalCodeBySlug)

router.put('/promotional-code/:id', updatePromotionalCode)

export default router
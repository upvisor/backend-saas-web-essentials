import { Router } from 'express'
import { createCampaign } from '../controllers/campaigns.controllers.js'

const router = Router()

router.post('/new-campaign', createCampaign)

export default router

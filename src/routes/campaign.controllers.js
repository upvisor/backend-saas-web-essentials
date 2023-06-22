import { Router } from 'express'
import { createCampaign, getCampaigns } from '../controllers/campaigns.controllers.js'

const router = Router()

router.post('/new-campaign', createCampaign)

router.get('/campaigns', getCampaigns)

export default router

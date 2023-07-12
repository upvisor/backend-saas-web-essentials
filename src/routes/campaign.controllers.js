import { Router } from 'express'
import { createCampaign, getCampaigns, getCampaign, trackCampaign } from '../controllers/campaigns.controllers.js'

const router = Router()

router.post('/new-campaign', createCampaign)

router.get('/campaigns', getCampaigns)

router.get('/campaign/:id', getCampaign)

router.get('/campaign/track/:id', trackCampaign)

export default router

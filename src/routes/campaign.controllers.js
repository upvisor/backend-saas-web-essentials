import { Router } from 'express'
import { createCampaign, getCampaigns, getCampaign } from '../controllers/campaigns.controllers.js'

const router = Router()

router.post('/new-campaign', createCampaign)

router.get('/campaigns', getCampaigns)

router.get('/campaign/:id', getCampaign)

export default router

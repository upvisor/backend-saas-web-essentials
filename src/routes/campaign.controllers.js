import { Router } from 'express'
import { createCampaign, getCampaigns, getCampaign, deleteCampaign } from '../controllers/campaigns.controllers.js'

const router = Router()

router.post('/new-campaign', createCampaign)

router.get('/campaigns', getCampaigns)

router.get('/campaign/:id', getCampaign)

router.delete('/campaign/:id', deleteCampaign)

export default router

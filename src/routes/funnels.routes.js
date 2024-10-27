import { Router } from 'express'
import { createFunnel, getFunnel, getFunnelSlug, getStepSlug, getFunnels, editFunnel, deleteFunnel, updateAllFunnels, getFunnelStep, getFunnelByStep, getFunnelByName, updateStep } from '../controllers/funnels.controllers.js'

const router = Router()

router.post('/funnel', createFunnel)

router.get('/funnel/:id', getFunnel)

router.get('/funnel-slug/:slug', getFunnelSlug)

router.get('/funnel/:funnel/:step', getStepSlug)

router.get('/funnels', getFunnels)

router.put('/funnel/:id', editFunnel)

router.delete('/funnel/:id', deleteFunnel)

router.put('/funnels', updateAllFunnels)

router.put('/funnel-step/:id', updateStep)

router.get('/funnel-step/:id', getFunnelStep)

router.get('/funnel-by-step/:id', getFunnelByStep)

router.get('/funnel-name/:funnel', getFunnelByName)

export default router
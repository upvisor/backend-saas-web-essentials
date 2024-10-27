import { Router } from 'express'
import { createLead, getLeads } from '../controllers/leads.controllers.js'

const router = Router()

router.post('/lead', createLead)

router.get('/leads', getLeads)

export default router
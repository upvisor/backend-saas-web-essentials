import { Router } from 'express'
import { pageView } from '../controllers/pages.controllers.js'

const router = Router()

router.post('/page', pageView)

export default router
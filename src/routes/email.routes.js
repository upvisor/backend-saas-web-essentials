import { Router } from 'express'
import { sendEmailClient } from '../controllers/email.controllers.js'

const router = Router()

router.post('/email/:id', sendEmailClient)

export default router
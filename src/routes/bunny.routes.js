import { Router } from 'express'
import { createVideo, uploadImage } from '../controllers/bunny.controllers.js'

const router = Router()

router.post('/video', createVideo)

router.post('/image', uploadImage)

export default router
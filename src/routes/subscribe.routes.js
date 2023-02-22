import {Router} from 'express'
import {createSubscribe, getSubscribe} from '../controllers/subscribe.controllers.js'

const router = Router()

router.post('/subscribe', createSubscribe)

router.get('/subscribe', getSubscribe)

export default router
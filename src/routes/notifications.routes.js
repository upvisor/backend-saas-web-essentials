import {Router} from 'express'
import { createNotification, getNotifications } from '../controllers/notifications.controllers.js'

const router = Router ()

router.post('/notification', createNotification)

router.get('/notifications', getNotifications)

export default router
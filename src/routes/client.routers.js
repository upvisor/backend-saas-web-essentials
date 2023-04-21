import {Router} from 'express'
import { createClient, getClients, updateClient } from '../controllers/client.controllers.js'

const router = Router()

router.post('/clients', createClient)

router.get('/clients', getClients)

router.put('/clients', updateClient)

export default router
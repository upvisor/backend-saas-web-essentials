import {Router} from 'express'
import { createClient, getClients, updateClient, getClient } from '../controllers/client.controllers.js'

const router = Router()

router.post('/clients', createClient)

router.get('/clients', getClients)

router.put('/clients', updateClient)

router.get('/clients/:id', getClient)

export default router
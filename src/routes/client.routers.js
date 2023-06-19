import {Router} from 'express'
import { createClient, getClients, updateClient, getClient, getClientByEmail } from '../controllers/client.controllers.js'

const router = Router()

router.post('/clients', createClient)

router.get('/clients', getClients)

router.put('/clients/:id', updateClient)

router.get('/clients/:id', getClient)

router.get('/clients-email/:id', getClientByEmail)

export default router
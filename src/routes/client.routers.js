import {Router} from 'express'
import { createClient, getClients, updateClient, getClient, createAccount, login } from '../controllers/client.controllers.js'

const router = Router()

router.post('/clients', createClient)

router.get('/clients', getClients)

router.put('/clients/:id', updateClient)

router.get('/clients/:id', getClient)

router.post('/register', createAccount)

router.post('/login', login)

export default router
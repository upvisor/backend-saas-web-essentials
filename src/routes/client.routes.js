import {Router} from 'express'
import { createClient, getClients, updateClient, getClient, getClientByEmail, createAccount, getAccountData, editAccountData } from '../controllers/client.controllers.js'

const router = Router()

router.post('/clients', createClient)

router.get('/clients', getClients)

router.put('/clients/:id', updateClient)

router.get('/clients/:id', getClient)

router.get('/client-email/:id', getClientByEmail)

router.post('/register', createAccount)

router.get('/account/:id', getAccountData)

router.put('/account/:id', editAccountData)

export default router
import { Router } from 'express'
import { createtData, getData } from '../controllers/clientData.controllers.js'

const router = Router()

router.post('/client-data', createtData)

router.get('/client-data', getData)

export default router
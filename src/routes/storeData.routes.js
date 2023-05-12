import {Router} from 'express'
import { createStoreData, editStoreData, getStoreData } from '../controllers/storeData.controllers.js'

const router = Router()

router.post('/store-data', createStoreData)

router.put('/store-data/:id', editStoreData)

router.get('/store-data', getStoreData)

export default router
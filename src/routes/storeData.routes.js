import {Router} from 'express'
import { createStoreData, getStoreData, editStoreData } from '../controllers/storeData.controllers.js'

const router = Router()

router.post('/store-data', createStoreData)

router.get('/store-data', getStoreData)

router.put('/store-data/:id', editStoreData)

export default router
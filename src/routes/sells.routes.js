import {Router} from 'express'
import {createSell, getSells, getSell, updateSell} from '../controllers/sell.controllers.js'

const router = Router()

router.post('/sells', createSell)

router.get('/sells', getSells)

router.get('/sells/:id', getSell)

router.put('/sells/:id', updateSell)

export default router
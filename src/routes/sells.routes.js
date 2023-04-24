import {Router} from 'express'
import {createSell, getSells, getSell, updateSell, getSellByEmail} from '../controllers/sell.controllers.js'

const router = Router()

router.post('/sells', createSell)

router.get('/sells', getSells)

router.get('/sells/:id', getSell)

router.put('/sells/:id', updateSell)

router.get('/sells/:email', getSellByEmail)

export default router
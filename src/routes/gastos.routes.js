import {Router} from 'express'
import {createGastos, getGastos} from '../controllers/gastos.controllers.js'

const router = Router()

router.post('/gastos', createGastos)

router.get('/gastos', getGastos)

export default router
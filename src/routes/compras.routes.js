import {Router} from 'express'
import {createCompra, getCompras} from '../controllers/compras.controllers.js'

const router = Router()

router.post('/compras', createCompra)

router.get('/compras', getCompras)

export default router
import {Router} from 'express'
import {createCompra, getCompras, getCompra, updateCompra} from '../controllers/compras.controllers.js'

const router = Router()

router.post('/compras', createCompra)

router.get('/compras', getCompras)

router.get('/compras/:id', getCompra)

router.put('/compras/:id', updateCompra)

export default router
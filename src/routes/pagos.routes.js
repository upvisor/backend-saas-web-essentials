import {Router} from 'express'
import {createOrder, captureOrder, cancelOrder, confirmOrder} from '../controllers/pagos.controllers.js'

const router = Router ()

router.post('/pagos/crear-orden', createOrder)

router.get('/pagos/capturando-orden', captureOrder)

router.get('/pagos/cancelar-orden', cancelOrder)

router.post('/pagos/verificar-orden', confirmOrder)

export default router
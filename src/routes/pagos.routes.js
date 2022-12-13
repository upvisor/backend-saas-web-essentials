import {Router} from 'express'
import {createOrder, confirmOrder, orderStatus} from '../controllers/pagos.controllers.js'

const router = Router ()

router.post('/pagos/crear-orden', createOrder)

router.post('/pagos/verificar-orden', confirmOrder)

router.post('/pagos/estado-orden', orderStatus)

export default router
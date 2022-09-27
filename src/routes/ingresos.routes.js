import {Router} from 'express'
import {createIngreso ,getIngresos} from '../controllers/ingresosControllers.js'

const router = Router()

router.post('/ingresos', createIngreso)

router.get('/ingresos', getIngresos)

export default router
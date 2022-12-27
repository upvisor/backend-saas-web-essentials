import {Router} from 'express'
import {createIngreso, getIngresos, updateIngresos} from '../controllers/ingresosControllers.js'

const router = Router()

router.post('/ingresos', createIngreso)

router.get('/ingresos', getIngresos)

router.put('/ingresos/:id', updateIngresos)

export default router
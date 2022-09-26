import {Router} from 'express'
import {createIngreso} from '../controllers/ingresosControllers.js'

const router = Router()

router.post('/ingresos', createIngreso)

export default router
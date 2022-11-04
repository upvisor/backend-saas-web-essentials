import {Router} from 'express'
import {getEstadisticas} from '../controllers/estadisticas.controllers.js'

const router = Router()

router.get('/estadisticas', getEstadisticas)

export default router
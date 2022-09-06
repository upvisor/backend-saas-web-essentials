import {Router} from 'express'
import {createDatos, getDatos} from '../controllers/datos.controllers.js'

const router = Router()

router.post('/datos', createDatos)

router.get('/datos', getDatos)

export default router
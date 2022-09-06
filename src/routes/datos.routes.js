import {Router} from 'express'
import {createDatos, updateDatos, getDatos} from '../controllers/datos.controllers.js'

const router = Router()

router.post('/datos', createDatos)

router.put('/datos', updateDatos)

router.get('/datos', getDatos)

export default router
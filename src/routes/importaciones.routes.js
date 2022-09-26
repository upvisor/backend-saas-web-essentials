import {Router} from 'express'
import {createImportacion, getImportaciones} from '../controllers/importaciones.controllers.js'

const router = Router()

router.post('/importaciones', createImportacion)

router.get('/importaciones', getImportaciones)

export default router
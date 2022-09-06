import {Router} from 'express'
import {createVisualizacion, getVisualizacion} from '../controllers/visualizacion.controllers.js'

const router = Router()

router.post('/visualizaciones', createVisualizacion)

router.get('/visualizaciones', getVisualizacion)

export default router
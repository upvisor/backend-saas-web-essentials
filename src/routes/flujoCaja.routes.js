import {Router} from 'express'
import {createFlujo, getFlujo} from '../controllers/flujoCaja.controllers.js'

const router = Router()

router.post('/flujo-de-caja', createFlujo)

router.get('/flujo-de-caja', getFlujo)
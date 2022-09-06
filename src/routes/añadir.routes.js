import {Router} from 'express'
import {createAñadir, getAñadir} from '../controllers/añadir.controllers.js'

const router = Router()

router.post('/anadir-al-carrito', createAñadir)

router.get('/anadir-al-carrito', getAñadir)

export default router
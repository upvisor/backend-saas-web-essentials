import {Router} from 'express'
import {createUsuario, getUsuario} from '../controllers/usuario.controllers.js'

const router = Router()

router.post('/usuario', createUsuario)

router.get('/usuario', getUsuario)

export default router
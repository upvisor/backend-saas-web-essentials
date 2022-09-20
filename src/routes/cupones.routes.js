import {Router} from 'express'
import {createCupon, getCupones, getCupon, deleteCupon, updateCupon} from '../controllers/cupones.controllers.js'

const router = Router()

router.post('/cupones', createCupon)

router.get('/cupones', getCupones)

router.get('/cupones/:id', getCupon)

router.delete('/cupones/:id', deleteCupon)

router.put('/cupones/:id', updateCupon)

export default router
import { Router } from 'express'
import { createAutomatization, getAutomatizations, getAutomatization, deleteAutomatization, editAutomatizacion } from '../controllers/automatizations.controllers.js'

const router = Router()

router.post('/automatization', createAutomatization)

router.get('/automatizations', getAutomatizations)

router.get('/automatization/:id', getAutomatization)

router.delete('/automatization/:id', deleteAutomatization)

router.put('/automatization/:id', editAutomatizacion)

export default router
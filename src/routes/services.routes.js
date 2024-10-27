import { Router } from 'express'
import { createService, deleteService, editService, getService, getServices, updateServiceStep } from '../controllers/services.controllers.js'

const router = Router()

router.post('/service', createService)

router.get('/services', getServices)

router.get('/service/:id', getService)

router.put('/service/:id', editService)

router.delete('/service/:id', deleteService)

router.put('/service-step/:id', updateServiceStep)

export default router
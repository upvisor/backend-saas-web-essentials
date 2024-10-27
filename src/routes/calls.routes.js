import { Router } from 'express'
import { createCall, getCall, getCallName, getCalls, editCall, deleteCall } from '../controllers/calls.controllers.js'

const router = Router()

router.post('/call', createCall)

router.get('/call/:id', getCall)

router.get('/call-name/:name', getCallName)

router.get('/calls', getCalls)

router.put('/call/:id', editCall)

router.delete('/call/:id', deleteCall)

export default router
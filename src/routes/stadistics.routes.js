import {Router} from 'express'
import {getStadistics} from '../controllers/stadistics.controllers.js'

const router = Router()

router.get('/stadistics', getStadistics)

export default router
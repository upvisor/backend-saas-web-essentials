import {Router} from 'express'
import { getCategories } from '../controllers/categories.controllers.js'

const router = Router()

router.get('/categories', getCategories)

export default router
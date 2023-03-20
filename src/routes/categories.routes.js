import {Router} from 'express'
import { getCategories, createCategory, getCategoryBySlug } from '../controllers/categories.controllers.js'

const router = Router()

router.get('/categories', getCategories)

router.post('/categories', createCategory)

router.get('/categories/:id', getCategoryBySlug)

export default router
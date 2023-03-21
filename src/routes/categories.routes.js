import {Router} from 'express'
import { getCategories, createCategory, getCategoryBySlug, deleteCategory } from '../controllers/categories.controllers.js'

const router = Router()

router.get('/categories', getCategories)

router.post('/categories', createCategory)

router.get('/categories/:id', getCategoryBySlug)

router.delete('/categories/:id', deleteCategory)

export default router
import {Router} from 'express'
import { getCategories, createCategory, getCategoryBySlug, deleteCategory, updateCategory } from '../controllers/categories.controllers.js'

const router = Router()

router.get('/categories', getCategories)

router.post('/categories', createCategory)

router.get('/categories/:id', getCategoryBySlug)

router.delete('/categories/:id', deleteCategory)

router.put('/categories/:id', updateCategory)

export default router
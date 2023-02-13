import {Router} from 'express'
import {getProducts, createProducto, updateProducto, deleteProducto} from '../controllers/products.controllers.js'

const router = Router()

router.get('/products', getProducts)

router.post('/products', createProducto)

router.put('/products/:id', updateProducto)

router.delete('/products/:id', deleteProducto)

export default router
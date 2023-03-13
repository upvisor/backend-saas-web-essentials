import {Router} from 'express'
import {getProducts, createProduct, updateProduct, deleteProduct, uploadImageProduct} from '../controllers/products.controllers.js'

const router = Router()

router.get('/products', getProducts)

router.post('/products', createProduct)

router.put('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)

router.post('/product-image-upload', uploadImageProduct)

export default router
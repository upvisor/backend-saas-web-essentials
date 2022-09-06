import {Router} from 'express'
import {getProductos, createProducto, updateProducto, deleteProducto, getProducto} from '../controllers/productos.controllers.js'

const router = Router()

router.get('/productos', getProductos)

router.post('/productos', createProducto)

router.put('/productos/:id', updateProducto)

router.delete('/productos/:id', deleteProducto)

router.get('/productos/:id', getProducto)

export default router
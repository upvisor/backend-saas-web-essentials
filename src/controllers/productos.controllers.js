import Producto from '../models/Producto.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
        res.send(productos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createProducto = async (req, res) => {
    try {
        const {nombre, precio, precioRebajado, descripcion, url, categorias, populares, variaciones, stock, oferta1Producto1, oferta1Producto2, oferta1Producto3, oferta1Producto4, oferta1Producto5, oferta1Producto6, oferta1Producto7, oferta1Producto8, oferta1Producto9, oferta1Producto10, oferta1Producto11, oferta1Producto12, oferta1Producto13, oferta1Producto14, oferta1Producto15, precio1, oferta2Producto1, oferta2Producto2, oferta2Producto3, oferta2Producto4, oferta2Producto5, oferta2Producto6, oferta2Producto7, oferta2Producto8, oferta2Producto9, oferta2Producto10, oferta2Producto11, oferta2Producto12, oferta2Producto13, oferta2Producto14, oferta2Producto15, precio2} = req.body
        const oferta = {
            oferta1: {
                producto1: oferta1Producto1,
                producto2: oferta1Producto2,
                producto3: oferta1Producto3,
                producto4: oferta1Producto4,
                producto5: oferta1Producto5,
                producto6: oferta1Producto6,
                producto7: oferta1Producto7,
                producto8: oferta1Producto8,
                producto9: oferta1Producto9,
                producto10: oferta1Producto10,
                producto11: oferta1Producto11,
                producto12: oferta1Producto12,
                producto13: oferta1Producto13,
                producto14: oferta1Producto14,
                producto15: oferta1Producto15,
                precio: precio1
            },
            oferta2: {
                producto1: oferta2Producto1,
                producto2: oferta2Producto2,
                producto3: oferta2Producto3,
                producto4: oferta2Producto4,
                producto5: oferta2Producto5,
                producto6: oferta2Producto6,
                producto7: oferta2Producto7,
                producto8: oferta2Producto8,
                producto9: oferta2Producto9,
                producto10: oferta2Producto10,
                producto11: oferta2Producto11,
                producto12: oferta2Producto12,
                producto13: oferta2Producto13,
                producto14: oferta2Producto14,
                producto15: oferta2Producto15,
                precio: precio2
            }
        }
        let imagen
        if (req.files?.imagen) {
            const result = await uploadImage(req.files.imagen.tempFilePath)
            await fs.remove(req.files.imagen.tempFilePath)
            imagen = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const nuevoProducto = new Producto({nombre, precio, precioRebajado, descripcion, url, categorias, populares, variaciones, stock, oferta, imagen})
        await nuevoProducto.save()
        return res.json(nuevoProducto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateProducto = async (req, res) => {
    try {
        const updateProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updateProducto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteProducto = async (req, res) => {
    try {
        const productoRemoved = await Producto.findByIdAndDelete(req.params.id)
        if (!productoRemoved) return res.sendStatus(404)
        if (productoRemoved.imagen.public_id) {
            await deleteImage(productoRemoved.imagen.public_id)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)
        if (!producto) return res.sendStatus(404)
        return res.json(producto)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }
}
import Product from '../models/Product.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        .lean()
        res.send(products)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createProduct = async (req, res) => {
    try {
        const data = req.body
        if (data.variations[0].variation === '') {
            data.variations = undefined
        }
        if (data.productsOffer[0].productsSale.length === 0) {
            data.productsOffer = undefined
        }
        const nuevoProducto = new Product(data)
        await nuevoProducto.save()
        return res.json(nuevoProducto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updateProducto = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updateProducto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productRemoved = await Product.findByIdAndDelete(req.params.id)
        if (!productRemoved) return res.sendStatus(404)
        if (productRemoved.images.length) {
            productRemoved.images.map(async (image) => await deleteImage(image.public_id))
        }
        if (productRemoved.variations.length) {
            productRemoved.variations.map(async (variation) => {
                if (variation.image.url) {
                    await deleteImage(variation.image.public_id)
                }
            })
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const uploadImageProduct = async (req, res) => {
    try {
        let image
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            return res.send({image: image})
        } else {
            console.log('no llega la imagen')
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProductBySlug = async (req, res) => {
    const product = await Product.findOne({slug: req.params.id}).lean()
  
    if ( !product ) {
      return null
    }
  
    return res.send(product)
}

export const getProductByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id }).lean()
        res.send(products)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
import Cupones from '../models/Cupones.js'

export const createCupon = async (req, res) => {
    try {
        const {descuento, valor, nombre, minPrecio, minProductos} = req.body
        const createdAt = new Date()
        const nuevoCupon = new Cupones({descuento, valor, nombre, minPrecio, minProductos, createdAt})
        await nuevoCupon.save()
        return res.json(nuevoCupon)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCupones = async (req, res) => {
    try {
        const cupones = await Cupones.find()
        res.send(cupones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCupon = async (req, res) => {
    try {
        const cupon = await Cupones.findById(req.params.id)
        if (!cupon) return res.sendStatus(404)
        return res.json(cupon)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const deleteCupon = async (req, res) => {
    try {
        const cuponEliminado = await Cupones.findByIdAndDelete(req.params.id)
        if (!cuponEliminado) return res.sendStatus(404)
        return res.json(cuponEliminado)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCupon = async (req, res) => {
    try {
        const updateCupon = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updateCupon)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
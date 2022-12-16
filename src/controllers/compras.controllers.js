import Compra from '../models/Compra.js'

export const createCompra = async (req, res) => {
    try {
        const {email, region, ciudad, nombre, apellido, direccion, departamento, telefono, cupon, carrito, envio, estado, pago, fecha} = req.body
        const cuponUpper = cupon.toUpperCase()
        const nuevaCompra = new Compra({email, region, ciudad, nombre, apellido, direccion, departamento, telefono, cupon: cuponUpper, carrito, envio, estado, pago, fecha})
        await nuevaCompra.save()
        return res.json(nuevaCompra)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCompras = async (req, res) => {
    try {
        const compras = await Compra.find()
        res.send(compras)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCompra = async (req, res) => {
    try {
        const compra = await Compra.findById(req.params.id)
        if (!compra) return res.sendStatus(404)
        res.json(compra)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCompra = async (req, res) => {
    try {
        const updateCompra = await Compra.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updateCompra)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
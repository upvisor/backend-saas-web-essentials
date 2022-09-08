import Añadir from '../models/Añadir.js'

export const createAñadir = async (req, res) => {
    try {
        const {cantidadProductos, nombre, precio, fecha} = req.body
        const nuevoAñadir = new Añadir({cantidadProductos, nombre, precio, fecha})
        await nuevoAñadir.save()
        return res.json(nuevoAñadir)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAñadir = async (req, res) => {
    try {
        const datos = await Añadir.find()
        res.send(datos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
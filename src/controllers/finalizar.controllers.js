import Finalizar from '../models/Finalizar.js'

export const createFinalizar = async (req, res) => {
    try {
        const carrito = req.body
        const fecha = new Date()
        const nuevoFinalizar = new Finalizar({carrito, fecha})
        await nuevoFinalizar.save()
        return res.json(nuevoFinalizar)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getFinalizar = async (req, res) => {
    try {
        const finalizar = await Finalizar.find()
        res.send(finalizar)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
import Suscripcion from '../models/Suscripcion.js'

export const createSuscripcion = async (req, res) => {
    try {
        const {email} = req.body
        const nuevaSuscripcion = new Suscripcion({email})
        await nuevaSuscripcion.save()
        return res.json(nuevaSuscripcion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSuscripcion = async (req, res) => {
    try {
        const suscripciones = await Suscripcion.find()
        res.send(suscripciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
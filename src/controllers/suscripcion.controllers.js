import Suscripcion from '../models/Suscripcion.js'

export const createSuscripcion = async (req, res) => {
    try {
        const {email} = req.body
        const fecha = new Date()
        const nuevaSuscripcion = new Suscripcion({email, fecha})
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
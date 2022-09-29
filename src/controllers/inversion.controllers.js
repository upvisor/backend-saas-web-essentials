import Inversion from '../models/Inversion.js'

export const createInversion = async (req, res) => {
    try {
        const {inversion} = req.body
        const nuevaInversion = new Inversion({inversion})
        await nuevaInversion.save()
        return res.json(nuevaInversion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getInversion = async (req, res) => {
    try {
        const inversion = await Inversion.find()
        return res.send(inversion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
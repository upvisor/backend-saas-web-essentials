import Mensajes from '../models/Mensajes.js'

export const createMensaje = async (req, res) => {
    try {
        const {conversacionId, sender, mensaje} = req.body
        const nuevoMensaje = new Mensajes({conversacionId, sender, mensaje})
        await nuevoMensaje.save()
        return res.json(nuevoMensaje)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMensajes = async (req, res) => {
    try {
        const mensajes = await Mensajes.find({
            conversacionId: req.params.conversacionId
        })
        return res.json(mensajes)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
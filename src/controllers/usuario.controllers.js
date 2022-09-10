import Usuario from '../models/Usuario.js'

export const createUsuario = async (req, res) => {
    try {
        const {usuario, contraseña} = req.body
        const nuevoUsuario = new Usuario({usuario, contraseña})
        await nuevoUsuario.save()
        return res.json(nuevoUsuario)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.find()
        res.send(usuario)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
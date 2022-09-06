import Contacto from '../models/Contacto.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const createMensaje = async (req, res) => {
    try {
        const {nombre, email, telefono, metodoRespuesta, mensaje} = req.body
        let imagen
        if (req.files?.imagen) {
            const result = await uploadImage(req.files.imagen.tempFilePath)
            await fs.remove(req.files.imagen.tempFilePath)
            imagen = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const nuevoMensaje = new Contacto({nombre, email, telefono, metodoRespuesta, mensaje, imagen})
        await nuevoMensaje.save()
        return res.json(nuevoMensaje)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMensajes = async (req, res) => {
    try {
        const mensajes = await Contacto.find()
        res.send(mensajes)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
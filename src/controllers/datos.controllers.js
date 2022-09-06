import Datos from '../models/Datos.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const createDatos = async (req, res) => {
    try {
        const {nombreTienda, emailTienda, telefonoTienda, instagramTienda, facebookTienda, whatsappTienda} = req.body
        let logo
        if (req.files?.logo) {
            const result = await uploadImage(req.files.logo.tempFilePath)
            await fs.remove(req.files.logo.tempFilePath)
            logo = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let logoBlanco
        if (req.files?.logoBlanco) {
            const result = await uploadImage(req.files.logoBlanco.tempFilePath)
            await fs.remove(req.files.logoBlanco.tempFilePath)
            logoBlanco = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const nuevoDato = new Datos({nombreTienda, emailTienda, telefonoTienda, instagramTienda, facebookTienda, whatsappTienda, logo, logoBlanco})
        await nuevoDato.save()
        return res.json(nuevoDato)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateDatos = async (req, res) => {
    try {
        const updateDatos = await Datos.findByIdAndUpdate(req.body._id, req.body, {new: true})
        res.send(updateDatos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getDatos = async (req, res) => {
    try {
        const datos = await Datos.find()
        return res.send(datos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
import Importacion from '../models/Importacion.js'

export const createImportacion = async (req, res) => {
    try {
        const {productos, fecha} = req.body
        const fechaFormateada = new Date(fecha)
        const nuevaImportacion = new Importacion({importacion: productos, fecha: fechaFormateada})
        await nuevaImportacion.save()
        return res.json(nuevaImportacion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getImportaciones = async (req, res) => {
    try {
        const importaciones = await Importacion.find()
        res.send(importaciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
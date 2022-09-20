import Visualizacion from '../models/Visualizacion.js'

export const createVisualizacion = async (req, res) => {
    try {
        const {producto, precio} = req.body
        const fecha = new Date()
        const nuevaVisualizacion = new Visualizacion({producto, precio, fecha})
        await nuevaVisualizacion.save()
        return res.json(nuevaVisualizacion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getVisualizacion = async (req, res) => {
    try {
        const visualizaciones = await Visualizacion.find()
        res.send(visualizaciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
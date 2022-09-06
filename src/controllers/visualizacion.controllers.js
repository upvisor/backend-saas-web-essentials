import Visualizacion from '../models/Visualizacion.js'

export const createVisualizacion = async (req, res) => {
    try {
        const {producto, precio} = req.body
        const nuevaVisualizacion = new Visualizacion({producto, precio})
        await nuevaVisualizacion.save()
        return res.json(nuevaVisualizacion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getVisualizacion = async (req, res) => {
    try {
        const Visualizaciones = await Visualizacion.find()
        res.send(Visualizaciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
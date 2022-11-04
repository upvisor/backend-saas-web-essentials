import Añadir from '../models/Añadir.js'
import Visualizacion from '../models/Visualizacion.js'
import Finalizar from '../models/Finalizar.js'
import Compra from '../models/Compra.js'
import Suscripcion from '../models/Suscripcion.js'

export const getEstadisticas = async (req, res) => {
    try {
        const visualizaciones = await Visualizacion.find()
        const añadidos = await Añadir.find()
        const pagos = await Finalizar.find()
        const compras = await Compra.find()
        const suscripciones = await Suscripcion.find()
        return res.send([visualizaciones, añadidos, pagos, compras, suscripciones])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
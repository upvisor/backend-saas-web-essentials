import AddCart from '../models/AddCart.js'
import ViewContent from '../models/ViewContent.js'
import Information from '../models/Information.js'
import Sell from '../models/Sell.js'
import Subscribe from '../models/Subscribe.js'

export const getEstadisticas = async (req, res) => {
    try {
        const visualizaciones = await ViewContent.find()
        const añadidos = await AddCart.find()
        const pagos = await Information.find()
        const compras = await Sell.find()
        const suscripciones = await Subscribe.find()
        return res.send([visualizaciones, añadidos, pagos, compras, suscripciones])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
import Gastos from '../models/Gastos.js'

export const createGastos = async (req, res) => {
    try {
        const {fecha, tipo, monto} = req.body
        const nuevoGasto = new Gastos({fecha, tipo, monto})
        await nuevoGasto.save()
        return res.json(nuevoGasto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getGastos = async (req, res) => {
    try {
        const gastos = await Gastos.find()
        res.send(gastos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
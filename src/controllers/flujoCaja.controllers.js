import FlujoCaja from '../models/FlujoCaja.js'

export const createFlujo = async (req, res) => {
    try {
        const {banco, valor} = req.body
        const fecha = new Date()
        const datos = await FlujoCaja.find()
        let id = ''
        if (datos.length !== 0) {
            datos.map(dato => {
                if (dato.banco === banco) {
                    id = dato._id
                }
                return id
            })
        }
        if (id !== '') {
            await FlujoCaja.findByIdAndDelete(id)
        }
        const nuevoFlujo = new FlujoCaja({banco, valor, fecha: fecha})
        await nuevoFlujo.save()
        res.json(nuevoFlujo)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getFlujo = async (req, res) => {
    try {
        const Flujos = await FlujoCaja.find()
        res.send(Flujos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
import ClientData from '../models/ClientData.js'

export const createtData = async (req, res) => {
    try {
        const newData = new ClientData({name: req.body.data, data: req.body.data.toLowerCase().replace(/ /g, '_')})
        const newDataSave = await newData.save()
        return res.json(newDataSave)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getData = async (req, res) => {
    try {
        const data = await ClientData.find().lean()
        return res.json(data)
    } catch {
        return res.status(500).json({message: error.message})
    }
}
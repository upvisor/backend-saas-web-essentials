import StoreData from '../models/StoreData.js'

export const createStoreData = async (req, res) => {
    try {
        const storeData = new StoreData(req.body)
        await storeData.save()
        return res.json(storeData)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getStoreData = async (req, res) => {
    try {
        const storeData = await StoreData.findOne().lean()
        return res.json(storeData)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const editStoreData = async (req, res) => {
    try {
        const storeDataEdit = await StoreData.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(storeDataEdit)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
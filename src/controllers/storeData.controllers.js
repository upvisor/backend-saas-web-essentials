import StoreData from '../models/StoreData.js'

export const createStoreData = async (req, res) => {
    try {
        const data = await StoreData.findOne().lean()
        if (data) {
            await StoreData.findOneAndDelete(data._id)
        }
        const storeData = new StoreData(req.body)
        await storeData.save()
        return res.json(storeData)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getStoreData = async (req, res) => {
    try {
        const storeData = await StoreData.find().lean()
        return res.json(storeData)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
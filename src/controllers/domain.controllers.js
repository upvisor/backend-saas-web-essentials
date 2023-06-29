import Domain from '../models/Domain.js'

export const createDomain = async (req, res) => {
    try {
        const domain = await Domain.find().lean()
        if (!domain) {
            const newDomain = new Domain(req.body)
            await newDomain.save()
            return res.send(newDomain)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getDomain = async (req, res) => {
    try {
        const domain = await Domain.find().lean()
        return res.send(domain)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
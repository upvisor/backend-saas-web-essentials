import Email from '../models/Email.js'

export const createCampaign = async (req, res) => {
    try {
        const newCampaign = new Email(req.body)
        await newCampaign.save()
        return res.send(newCampaign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
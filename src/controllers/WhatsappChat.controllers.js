import WhatsappMessage from '../models/WhatsappChat.js'

export const createMessage = async (req, res) => {
    try {
        const newMessage = new WhatsappMessage(req.body)
        await newMessage.save()
        return res.json(newMessage)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await WhatsappMessage.findOne({phone: number}).select('-updatedAt -__v -_id')
        return res.json(messages)
    } catch {
        return res.status(500).json({message: error.message})
    }
}
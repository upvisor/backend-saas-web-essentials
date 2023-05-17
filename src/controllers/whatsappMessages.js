import WhatsappChat from '../models/WhatsappChat.js'

export const getMessages = async (req, res) => {
    try {
        const messages = await WhatsappChat.find().select('-_id').lean()
        return res.send(messages)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
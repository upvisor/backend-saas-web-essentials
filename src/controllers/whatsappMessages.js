import WhatsappChat from '../models/WhatsappChat.js'

export const getPhones = async (req, res) => {
    try {
        const messages = await WhatsappChat.find().select('-message -response').lean()
        const filter = messages.filter(message => message.agent === true)
        const phoneNumbers = filter.map(item => item.phone)
        const uniquePhoneNumbersSet = new Set(phoneNumbers)
        const uniquePhoneNumbersArray = [...uniquePhoneNumbersSet]
        return res.send(uniquePhoneNumbersArray)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMessagesPhone = async (req, res) => {
    try {
        const messages = await WhatsappChat.find({phone: req.params.id})
        res.send(messages)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const newMessage = async (req, res) => {
    try {
        const newMessage = new WhatsappChat(req.body)
        await newMessage.save()
        return res.send(newMessage)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
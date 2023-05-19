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
        await axios.post('https://graph.facebook.com/v16.0/108940562202993/messages', {
            "messaging_product": "whatsapp",
            "to": req.body.phone,
            "type": "text",
            "text": {"body": req.body.response}
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`
            }
        })
        const newMessage = new WhatsappChat(req.body)
        await newMessage.save()
        return res.send(newMessage)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
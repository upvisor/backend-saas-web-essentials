import WhatsappChat from '../models/WhatsappChat.js'

export const getMessages = async (req, res) => {
    try {
        const messages = await WhatsappChat.find().select('-message -response').lean()
        const filter = messages.filter(message => message.agent === true)
        const phoneNumbers = filter.map(item => item.phone)
        const uniquePhoneNumbersSet = new Set(phoneNumbers)
        const uniquePhoneNumbersArray = [...uniquePhoneNumbersSet]
        let chats = []
        await Promise.all(
            uniquePhoneNumbersArray.map(async phone => {
                const messagesPhone = await WhatsappChat.find({phone: phone}).lean()
                console.log(messagesPhone)
                chats = chats.concat(messagesPhone)
            })
        )
        return res.send(chats)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
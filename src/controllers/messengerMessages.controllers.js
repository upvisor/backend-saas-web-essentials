import MessengerMessage from '../models/MessengerChat.js'
import axios from 'axios'

export const getMessengerIds = async (req, res) => {
    try {
        const messages = await MessengerMessage.find().select('-message -response').lean()
        const filter = messages.filter(message => message.agent === true)
        const messengerIds = filter.map(item => item.messengerId)
        const uniqueMessengerIdsSet = new Set(messengerIds)
        const uniqueMessengerIdsArray = [...uniqueMessengerIdsSet]
        return res.send(uniqueMessengerIdsArray)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMessagesMessenger = async (req, res) => {
    try {
        const messages = await MessengerMessage.find({messengerId: req.params.id})
        res.send(messages)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createMessage = async (req, res) => {
    try {
        await axios.post(`https://graph.facebook.com/v16.0/106714702292810/messages?access_token=${process.env.MESSENGER_TOKEN}`, {
            "recipient": {
                "id": req.body.sender
            },
            "messaging_type": "RESPONSE",
            "message": {
                "text": req.body.response
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const newMessage = new MessengerMessage({messengerId: req.body.sender, response: req.body.response, agent: req.body.agent})
        await newMessage.save()
        return res.send(newMessage)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
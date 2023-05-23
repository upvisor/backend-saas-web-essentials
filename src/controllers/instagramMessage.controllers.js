import InstagramMessage from '../models/InstagramChat.js'
import axios from 'axios'

export const getInstagramIds = async (req, res) => {
    try {
        const messages = await InstagramMessage.find().select('-message -response').lean()
        const filter = messages.filter(message => message.agent === true)
        const instagramIds = filter.map(item => item.instagramId)
        const uniqueInstagramIdsSet = new Set(instagramIds)
        const uniqueInstagramIdsArray = [...uniqueInstagramIdsSet]
        return res.send(uniqueInstagramIdsArray)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getMessagesInstagram = async (req, res) => {
    try {
        const messages = await InstagramMessage.find({instagramId: req.params.id})
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
        const newMessage = new InstagramMessage({instagramId: req.body.sender, response: req.body.response, agent: req.body.agent})
        await newMessage.save()
        return res.send(newMessage)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
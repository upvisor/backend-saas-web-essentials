import MessengerMessage from '../models/MessengerChat.js'

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
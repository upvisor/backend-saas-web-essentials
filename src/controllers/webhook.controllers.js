import { Configuration, OpenAIApi } from "openai"
import Product from '../models/Product.js'
import axios from "axios"
import WhatsappMessage from "../models/WhatsappChat.js"

export const createWebhook = (req, res) => {
    if (req.query['hub.verify_token'] === 'maaide_token') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('No tienes permisos')
    }
}

export const getMessage = async (req, res) => {
    try {
        if (req.body?.entry && req.body.entry[0]?.changes && req.body.entry[0].changes[0]?.value?.messages && 
            req.body.entry[0].changes[0].value.messages[0]?.text && req.body.entry[0].changes[0].value.messages[0].text.body) {  
            const message = req.body.entry[0].changes[0].value.messages[0].text.body
            const number = req.body.entry[0].changes[0].value.messages[0].from
            const messages = await WhatsappMessage.find({phone: number}).select('-phone -_id').lean()
            const ultimateMessage = messages.reverse()
            if (ultimateMessage && ultimateMessage.length && ultimateMessage[0].agent) {
                const newMessage = new WhatsappMessage({phone: number, message: message, agent: true})
                await newMessage.save()
                return res.sendStatus(200)
            } else {
                const configuration = new Configuration({
                    organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
                    apiKey: process.env.OPENAI_API_KEY,
                })
                const openai = new OpenAIApi(configuration)
                const responseCategorie = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: `Con las siguientes categorias: saludo, productos, envios, horarios, seguridad, garantia, promociones y devoluciones. Cuales encajan mejor con la siguiente pregunta: ${message}`,
                    temperature: 0,
                    max_tokens: 50
                })
                const categories = responseCategorie.data.choices[0].text.toLowerCase()
                let information = ''
                if (categories.includes('productos')) {
                    const products = await Product.find().select('name description stock price beforePrice variations -_id').lean()
                    information = `${information}. ${JSON.stringify(products)}`
                }
                let structure
                let agent
                if (message.toLowerCase() === 'agente') {
                    structure = [
                        {"role": "system", "content": 'Eres un asistente llamado Maaibot de la tienda Maaide, deseo que expreses de la mejor forma que estas transfiriendo al usuario con un agente'},
                        {"role": "user", "content": message}
                    ]
                    agent = true
                } else if (information === '') {
                    structure = [
                        {"role": "system", "content": 'Eres un asistente llamado Maaibot de la tienda Maaide, si el usuario esta haciendo una pregunta, no tienes información para responderla, entonces debes indicarle que para hablar con un agente tiene que escribir "agente" en el chat'},
                        {"role": "user", "content": message}
                    ]
                    agent = false
                } else if (ultimateMessage.length) {
                    structure = [
                        {"role": "system", "content": `Eres un asistente llamado Maaibot de la tienda Maaide, la unica informacion que usaras para responder la pregunta es la siguiente: ${information}`},
                        {"role": "user", "content": ultimateMessage[0].message},
                        {"role": "assistant", "content": ultimateMessage[0].response},
                        {"role": "user", "content": message}
                    ]
                    agent = false
                } else {
                    structure = [
                        {"role": "system", "content": `Eres un asistente llamado Maaibot de la tienda Maaide, la unica informacion que usaras para responder la pregunta es la siguiente: ${information}`},
                        {"role": "user", "content": message}
                    ]
                    agent = false
                }
                const responseChat = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    temperature: 0,
                    messages: structure,
                    max_tokens: 150
                })
                const responseMessage = responseChat.data.choices[0].message.content
                await axios.post('https://graph.facebook.com/v16.0/108940562202993/messages', {
                    "messaging_product": "whatsapp",
                    "to": number,
                    "type": "text",
                    "text": {"body": responseMessage}
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`
                    }
                })
                const newMessage = new WhatsappMessage({phone: number, message: message, response: responseMessage, agent: agent})
                await newMessage.save()
                return res.sendStatus(200)
            }
        } else if (req.body?.entry && req.body.entry[0]?.messaging && req.body.entry[0].messaging[0]?.message?.text) {
            console.log(req.body.entry[0].messaging[0].message)
            return res.sendStatus(200)
        } else {
            return res.sendStatus(200)
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
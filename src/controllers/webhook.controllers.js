import { Configuration, OpenAIApi } from "openai"
import Product from '../models/Product.js'
import axios from "axios"
import WhatsappMessage from "../models/WhatsappChat.js"

export const createWebhook = (req, res) => {
    if (req.query['hub.verify_token'] === 'maaide_token') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('No tienes permisos.')
    }
}

export const getMessage = async (req, res) => {
    try {
        console.log('se ejecuto')
        if (req.body?.entry && req.body.entry[0]?.changes && req.body.entry[0].changes[0]?.value?.messages && 
            req.body.entry[0].changes[0].value.messages[0]?.text && req.body.entry[0].changes[0].value.messages[0].text.body) {    
            const message = req.body.entry[0].changes[0].value.messages[0].text.body
            const number = req.body.entry[0].changes[0].value.messages[0].from
            const configuration = new Configuration({
                organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
                apiKey: process.env.OPENAI_API_KEY,
            })
            const openai = new OpenAIApi(configuration)
            const responseCategorie = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Con las siguientes categorias: saludo, productos, envios, horarios, seguridad, garantia, promociones y devoluciones. Cuales encajan mejor con la siguiente pregunta: ${message}`,
                temperature: 0,
                max_tokens: 100
            })
            const categories = responseCategorie.data.choices[0].text.toLowerCase()
            let information = ''
            if (categories.includes('productos')) {
                const products = await Product.find().select('name description stock price beforePrice variations -_id').lean()
                information = `${information}. ${JSON.stringify(products)}`
            }
            const messages = await WhatsappMessage.find({phone: number}).select('-phone -_id').lean()
            const ultimateMessage = messages.reverse()
            let structure
            if (ultimateMessage.length) {
                structure = [
                    {"role": "system", "content": `Eres un asistente llamado Maaibot de la tienda Maaide, es sumamente importante que si no tienes la informacion para responder la pregunta, indiques que pueden hablar con un agente escribiendo "agente" en el chat, la informacion es la siguiente: ${information}`},
                    {"role": "user", "content": ultimateMessage[0].message},
                    {"role": "assistant", "content": ultimateMessage[0].response},
                    {"role": "user", "content": message}
                ]
            } else {
                structure = [
                    {"role": "system", "content": `Eres un asistente llamado Maaibot de la tienda Maaide, es sumamente importante que si no tienes la informacion para responder la pregunta, indiques que pueden hablar con un agente escribiendo "agente" en el chat, la informacion es la siguiente: ${information}`},
                    {"role": "user", "content": message}
                ]
            }
            const responseChat = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                temperature: 0,
                messages: structure
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
            const newMessage = new WhatsappMessage({phone: number, message: message, response: responseMessage, agent: false})
            await newMessage.save()
            return res.sendStatus(200)
        } else {
            return res.sendStatus(200)
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
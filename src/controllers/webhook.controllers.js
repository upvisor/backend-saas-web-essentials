import { Configuration, OpenAIApi } from "openai"
import Product from '../models/Product.js'
import axios from "axios"

export const createWebhook = (req, res) => {
    if (req.query['hub.verify_token'] === 'maaide_token') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('No tienes permisos.')
    }
}

export const getMessage = async (req, res) => {
    if (req.body.entry[0].changes[0].value.messages[0].text.body) {
        const message = req.body.entry[0].changes[0].value.messages[0].text.body
        const number = req.body.entry[0].changes[0].value.messages[0].from
        const configuration = new Configuration({
            organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration)
        const responseCategorie = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `En base a las siguientes categorias: productos, envios, horarios, seguridad, garantia, promociones y devoluciones. Cuales categorias son las que mas encajan (maximo 2) con la siguiente pregunta: ${message}`,
          max_tokens: 500
        })
        const categories = responseCategorie.data.choices[0].text.toLowerCase()
        let information = ''
        if (categories.includes('productos')) {
          const products = await Product.find().select('name description stock price beforePrice category tags variations -_id').lean()
          information = `${information}. ${JSON.stringify(products)}`
        }
        const responseChat = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0,
            messages:[
                {"role": "system", "content": `Eres un asistente llamado Maaibot de la tienda Maaide, para responder las preguntas utiliza unicamente la siguiente informacion: ${information}`},
                {"role": "user", "content": message}
            ],
        })
        await axios.post('https://graph.facebook.com/v16.0/108940562202993/messages', {
            "messaging_product": "whatsapp",
            "to": number,
            "type": "text",
            "text": {"body": message}
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer EAAUMZAI78GWEBABXMasOQJQcb8ho3dQZB3taP4ML2iZAPUTAABUsS1S4akhLMQHR8ESPRXhiWPyQ5ZBbp0RHVrZCZCMNZAgW724G7eW7lwqsZAisPP16R66dAMsQbqbPjievzdWoaVHn7tGB5iNN41rJqbfyayM9uERFrdZATkoJJQVfRB5ReOgxkOZCQj3j9ZAawzCbytq2udSj6g0QSZBBr7SE"
            }
        })
        console.log(responseChat.data.choices[0].message)
        console.log('Incoming webhook: ' + JSON.stringify(req.body))
        res.sendStatus(200)
    }
    res.sendStatus(200)
}
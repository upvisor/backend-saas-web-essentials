import { Configuration, OpenAIApi } from "openai"
import Product from '../models/Product.js'

export const responseMessage = async (req, res) => {
    try {
        const configuration = new Configuration({
            organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration)
        const responseCategorie = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `En base a las siguientes categorias: productos, envios, horarios, seguridad, garantia, promociones y devoluciones. Cuales categorias son las que mas encajan (maximo 2) con la siguiente pregunta: ${req.body.message}`,
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
                {"role": "system", "content": `Eres un asistente de ayuda llamado Maaibot de la tienda Maaide, para responder las preguntas utiliza unicamente la siguiente informacion: ${information}`},
                {"role": "user", "content": req.body.message}
            ],
        })
        res.send(responseChat.data.choices[0].message)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
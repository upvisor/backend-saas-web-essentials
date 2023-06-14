import { Configuration, OpenAIApi } from "openai"

export const createSeo = async (req, res) => {
    try {
        const { description, type } = req.body
        const configuration = new Configuration({
            organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration)
        const responseTitle = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Respóndeme como un experto en copywriting y seo especializado en E-commerce con mas de 15 años de experiencia. Quiero que redactes un meta título con un tono ${type} para un producto de un E-commerce. Finaliza el meta titulo con "| Blaspod". El producto es: ${description}`,
            max_tokens: 1000,
            temperature: 0
        })
        const responseDescription = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Respóndeme como un experto en copywriting y seo especializado en E-commerce con mas de 15 años de experiencia. Quiero que redactes una meta descripción con un tono ${type} para un producto de un E-commerce, habla acerca del producto con la palabra "nuestro". El producto es: ${description}`,
            max_tokens: 1000,
            temperature: 0
        })
        return res.json({
            title: responseTitle.data.choices,
            description: responseDescription.data.choices
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
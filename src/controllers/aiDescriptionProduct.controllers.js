import { Configuration, OpenAIApi } from "openai"

export const createDescription = async (req, res) => {
    try {
        const { description, type } = req.body
        const configuration = new Configuration({
            organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Respóndeme como un experto en copywriting y seo especializado en E-commerce con mas de 15 años de experiencia. Quiero que redactes una descripción con un tono ${type} con un maximo de 500 caracteres para un producto de un E-commerce, habla acerca del producto con la palabra "nuestro", no repitas partes de la descripción y no pongas "en resumen" en el parrafo final. El producto es: ${description}`,
            max_tokens: 1000,
            temperature: 0
        })
        return res.json(response.data.choices)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
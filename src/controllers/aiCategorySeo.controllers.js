import { Configuration, OpenAIApi } from "openai"

export const createSeo = async (req, res) => {
    try {
        const { description } = req.body
        const configuration = new Configuration({
            organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Actua como si fueras un experto en SEO especializado en ecommerces con 15 años de experiencia escribiendo meta titulos y meta descripciones par tiendas online, necesito que escribas un meta titulo y una meta descripcion persuasivos y que suenen profesionales para una categoria de la tienda online, la categoria es la siguiente: ${description}`,
            max_tokens: 1000,
            temperature: 0
        })
        console.log(response.data.choices)
        return res.json(response.data.choices)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
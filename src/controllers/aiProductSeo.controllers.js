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
            prompt: `I want you to pretend that you are an E-commerce SEO expert who writes compelling product descriptions for users looking to buy online. Write a persuasive and professional sounding Meta Title and Description that integrates similar language present in the new product summary text. Make sure to include a numerical aspect in the Meta Title. Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Write all output in Spanish. Please use the following products: ${description}`,
            max_tokens: 1000,
            temperature: 0
        })
        return res.json(response.data.choices)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
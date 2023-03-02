import { Configuration, OpenAIApi } from "openai"

export const createDescription = async (req, res) => {
    try {
        const { description } = req.body
        const configuration = new Configuration({
            organization: "org-s20w0nZ3MxE2TSG8LAAzz4TO",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `I want you to pretend that you are an E-commerce SEO expert who writes compelling category descriptions for users looking to buy online. I am going to provide the title of one e-commerce category and I want you to write the category description of maximum 15 words. The main point of these commands is for you to developing a new description category. The purpose of category description is marketing the category to users looking to buy. Use emotional words and creative reasons to show why a user should purchase the products of the category I tell you. Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do not ask questions. Write all output in Spanish. Please use the following category: ${description}`,
            max_tokens: 1000,
            temperature: 0
        })
        return res.json(response.data.choices)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
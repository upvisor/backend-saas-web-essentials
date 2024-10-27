import Client from "../models/Client.js"

export const desubscribeClient = async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate(
            { email: req.params.email },
            { $addToSet: { tags: 'desuscrito' } },
            { new: true }
        );
        return res.json(client)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
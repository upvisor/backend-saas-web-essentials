import Conversacion from '../models/Conversacion.js'

export const createConversacion = async (req, res) => {
    try {
        const {senderId} =  req.body
        const receiverId = "df7f1f15-e842-4a96-a2ca-595c66ff972f"
        const nuevaConversacion = new Conversacion({
            miembros: [senderId, receiverId]
        })
        await nuevaConversacion.save()
        return res.json(nuevaConversacion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getConversacion = async (req, res) => {
    try {
        const conversaciones = await Conversacion.find({
            miembros: { $in: [req.params.userId] }
        })
        return res.json(conversaciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
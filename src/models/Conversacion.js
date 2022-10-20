import mongoose from 'mongoose'

const ConversacionSchema = new mongoose.Schema(
    {
        miembros: {
            type: Array
        }
    },
    {timestamps: true}
)

export default mongoose.model('conversaciones', ConversacionSchema)
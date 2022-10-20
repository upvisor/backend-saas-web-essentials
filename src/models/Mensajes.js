import mongoose from 'mongoose'

const MensajesSchema = new mongoose.Schema(
    {
        conversacionId: {
            type: String
        },
        sender: {
            type: String
        },
        mensaje: {
            type: String
        }
    },
    {timestamps: true}
)

export default mongoose.model('mensajes', MensajesSchema)
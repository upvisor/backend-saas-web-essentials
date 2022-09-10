import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    }
})

export default mongoose.model('Usuario', UsuarioSchema)
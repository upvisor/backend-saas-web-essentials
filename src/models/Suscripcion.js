import mongoose from 'mongoose'

const SuscripcionSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Suscripcion', SuscripcionSchema)
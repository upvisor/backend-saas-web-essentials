import mongoose from 'mongoose'

const SuscripcionSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    }
})

export default mongoose.model('Suscripcion', SuscripcionSchema)
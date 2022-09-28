import mongoose from 'mongoose'

const FlujoCajaSchema = mongoose.Schema({
    banco: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true
    }
})

export default mongoose.model('FlujoCaja', FlujoCajaSchema)
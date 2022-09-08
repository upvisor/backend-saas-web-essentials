import mongoose from 'mongoose'

const FinalizarSchema = mongoose.Schema({
    carrito: {
        type: Array,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Finalizar', FinalizarSchema)
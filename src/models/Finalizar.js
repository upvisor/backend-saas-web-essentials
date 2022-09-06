import mongoose from 'mongoose'

const FinalizarSchema = mongoose.Schema({
    carrito: {
        type: Array,
        require: true
    }
})

export default mongoose.model('Finalizar', FinalizarSchema)
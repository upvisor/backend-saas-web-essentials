import mongoose from 'mongoose'

const AñadirSchema = mongoose.Schema({
    cantidadProductos: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Añadir', AñadirSchema)
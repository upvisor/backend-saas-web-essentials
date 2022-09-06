import mongoose from 'mongoose'

const AñadirSchema = mongoose.Schema({
    cantidadProductos: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    }
})

export default mongoose.model('Añadir', AñadirSchema)
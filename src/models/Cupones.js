import mongoose from 'mongoose'

const CuponesSchema = new mongoose.Schema({
    descuento: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    minPrecio: {
        type: Number,
        trim: true
    },
    minProductos: {
        type: Number,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Cupones', CuponesSchema)
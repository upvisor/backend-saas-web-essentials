import mongoose from 'mongoose'

const IngresoSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    productos: {
        type: String,
        required: true
    },
    recibido: {
        type: Number,
        required: true
    },
    envio: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: true
    },
    excedente: {
        type: Number,
        default: 0
    },
    capital: {
        type: Number,
        default: 0
    },
    ganancia: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Ingreso', IngresoSchema)
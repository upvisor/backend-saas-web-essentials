import mongoose from 'mongoose'

const CompraSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    departamento: {
        type: String,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    cupon: {
        type: String,
        trim: true
    },
    carrito: {
        type: Array,
        required: true
    },
    envio: {
        type: Number,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true
    }
})

export default mongoose.model('compra', CompraSchema)
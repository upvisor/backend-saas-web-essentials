import mongoose from 'mongoose'

const CompraSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    },
    region: {
        type: String,
        require: true,
        trim: true
    },
    ciudad: {
        type: String,
        require: true,
        trim: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    direccion: {
        type: String,
        require: true,
        trim: true
    },
    departamento: {
        type: String,
        trim: true
    },
    telefono: {
        type: Number,
        require: true,
        trim: true
    },
    carrito: {
        type: Array,
        require: true
    },
    envio: {
        type: Number,
        require: true,
        trim: true,
    },
    estado: {
        type: String,
        require: true,
    },
    fecha: {
        type: Date,
        require: true
    }
})

export default mongoose.model('compra', CompraSchema)
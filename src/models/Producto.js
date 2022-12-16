import mongoose from 'mongoose'

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    precioAnterior: {
        type: Number,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    categorias: {
        type: String,
        trim: true
    },
    populares: {
        type: Boolean,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        require: true,
        trim: true
    },
    variaciones: {
        type: String,
        trim: true
    },
    oferta: {
        oferta1: Object,
        oferta2: Object
    },
    imagen: {
        url: String,
        public_id: String
    },
    calificaciones: {
        type: Array
    }
})

export default mongoose.model('Producto', productoSchema)
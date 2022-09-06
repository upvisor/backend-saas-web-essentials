import mongoose from 'mongoose'

const ContactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        trim: true
    },
    metodoRespuesta: {
        type: String,
        required: true,
        trim: true
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        url: String,
        public_id: String
    }
})

export default mongoose.model('Contacto', ContactoSchema)
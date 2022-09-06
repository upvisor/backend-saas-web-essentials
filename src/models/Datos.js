import mongoose from 'mongoose'

const DatosSchema = mongoose.Schema({
    nombreTienda: {
        type: String,
        required: true,
        trim: true
    },
    emailTienda: {
        type: String,
        required: true,
        trim: true
    },
    telefonoTienda: {
        type: Number,
        required: true,
        trim: true
    },
    instagramTienda: {
        type: String,
        trim: true
    },
    facebookTienda: {
        type: String,
        trim: true
    },
    whatsappTienda: {
        type: String,
        trim: true
    },
    logo: {
        url: String,
        public_id: String
    },
    logoBlanco: {
        url: String,
        public_id: String
    }
})

export default mongoose.model('Datos', DatosSchema)
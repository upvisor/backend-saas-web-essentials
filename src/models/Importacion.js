import mongoose from 'mongoose'

const ImportacionSchema = mongoose.Schema({
    importacion: {
        type: Array,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Importaciones', ImportacionSchema)
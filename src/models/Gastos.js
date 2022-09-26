import mongoose from 'mongoose'

const GastosSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true,
        trim: true
    }
})

export default mongoose.model('gastos', GastosSchema)
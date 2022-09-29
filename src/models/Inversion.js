import mongoose from 'mongoose'

const InversionSchema = mongoose.Schema({
    montoInicial: {
        type: Number,
        required: true,
        trim: true
    }
})

export default mongoose.model('Inversion', InversionSchema)
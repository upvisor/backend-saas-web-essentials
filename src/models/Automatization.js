import mongoose from 'mongoose'

const AutomatizationSchema = new mongoose.Schema({
    address: { type: String, required: true },
    automatizations: [{ affair: { type: String, required: true }, title: { type: String, required: true }, paragraph: { type: String, required: true }, buttonText: { type: String }, url: { type: String }, date: { type: Date } }]
}, {
    timestamps: true
})

const Automatization = mongoose.models.Automatization || mongoose.model('Automatization', AutomatizationSchema)

export default Automatization
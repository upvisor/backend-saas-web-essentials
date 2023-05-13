import mongoose from 'mongoose'

const WhatsappMessageSchema = mongoose.Schema({
    phone: { type: Number, required: true },
    message: { type: String, required: true },
    response: { type: String, required: true }
}, {
    timestamps: true
})

const WhatsappMessage = mongoose.models.WhatsappMessage || mongoose.model('WhatsappMessage', WhatsappMessageSchema)

export default WhatsappMessage
import mongoose from 'mongoose'

const MessengerMessageSchema = mongoose.Schema({
    messegerId: { type: String, required: true },
    message: { type: String },
    response: { type: String },
    agent: { type: Boolean, required: true }
}, {
    timestamps: true
})

const MessengerMessage = mongoose.models.MessengerMessage || mongoose.model('MessengerMessage', MessengerMessageSchema)

export default MessengerMessage
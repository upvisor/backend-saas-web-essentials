import mongoose from 'mongoose'

const ClientDataSchema = new mongoose.Schema({
    name: { type: String },
    data: { type: String }
}, {
    timestamps: true
})

const ClientData = mongoose.models.ClientData || mongoose.model('ClientData', ClientDataSchema)

export default ClientData
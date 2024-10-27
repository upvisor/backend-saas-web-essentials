import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema({
    page: { type: String },
    service: { type: String },
    funnel: { type: String },
    step: { type: String }
}, {
    timestamps: true
})

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema)

export default Lead
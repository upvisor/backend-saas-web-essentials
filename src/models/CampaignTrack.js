import mongoose from 'mongoose'

const CampaignTrackSchema = new mongoose.Schema({
    campign: { type: String },
    email: { type: String }
}, {
    timestamps: true
})

const CampaignTrack = mongoose.models.CampaignTrack || mongoose.model('CampaignTrack', CampaignTrackSchema)

export default CampaignTrack
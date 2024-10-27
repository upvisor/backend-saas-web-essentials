import mongoose from 'mongoose'

const MeetingSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: Number },
    meeting: { type: String, required: true },
    date: { type: Date, required: true },
    url: { type: String, required: true },
    data: [{ name: { type: String }, value: { type: String } }],
    service: { type: String },
    stepService: { type: String },
    funnel: { type: String },
    step: { type: String }
}, {
    timestamps: true
})

const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', MeetingSchema)

export default Meeting
import mongoose from 'mongoose'

const SubscribeSchema = mongoose.Schema({
  email: { type: String, required: true, trim: true }
}, {
  timestamps: true
})

const Subscribe = mongoose.models.Subscribe || mongoose.model('Subscribe', SubscribeSchema)

export default Subscribe
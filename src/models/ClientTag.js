import mongoose from 'mongoose'

const TagClientsSchema = mongoose.Schema({
  tag: { type: String, required: true, unique: true }
}, {
  timestamps: true
})

const TagClient = mongoose.models.TagClient || mongoose.model('TagClient', TagClientsSchema)

export default TagClient
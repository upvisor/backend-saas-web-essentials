import mongoose from 'mongoose'

const ClientSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  tags: [{ type: String }]
})

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema)

export default Client
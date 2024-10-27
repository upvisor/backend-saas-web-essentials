import mongoose from 'mongoose'

const StoreDataSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  logo: { type: String },
  logoWhite: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  tiktok: { type: String },
  whatsapp: { type: String }
}, {
  timestamps: true
})

const StoreData = mongoose.models.StoreData || mongoose.model('StoreData', StoreDataSchema)

export default StoreData
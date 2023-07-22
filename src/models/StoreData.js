import mongoose from 'mongoose'

const StoreDataSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  address: { type: String },
  departament: { type: String },
  region: { type: String },
  city: { type: String },
  schedule: {
    monday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
    thesday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
    wednesday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
    thursday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
    friday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
    saturday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
    sunday: { state: { type: Boolean, required: true }, open: { type: String, required: true }, close: { type: String, required: true } },
  },
  logo: { public_id: { type: String }, url: { type: String } },
  logoWhite: { public_id: { type: String }, url: { type: String } }
}, {
  timestamps: true
})

const StoreData = mongoose.models.StoreData || mongoose.model('StoreData', StoreDataSchema)

export default StoreData
import mongoose from 'mongoose'

const SellSchema = mongoose.Schema({
  email: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  firstName: { type: String, require: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  departament: { type: String, trim: true },
  phone: { type: Number, required: true, trim: true },
  coupon: { type: String, trim: true },
  cart: { type: Array, required: true },
  shipping: { type: Number, required: true, trim: true, },
  state: { type: String, required: true },
  pay: { type: String, required: true },
  total: { type: Number, required: true }
}, {
  timestamps: true
})

const Sell = mongoose.models.Sell || mongoose.model('Sell', SellSchema)

export default Sell
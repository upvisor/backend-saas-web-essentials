import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  beforePrice: { type: Number },
  timeOffer: { type: String },
  variations: [{ type: String }],
  productsOffer: [{ products: [{ type: String }], price: { type: Number, required: true } }],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
  reviews: [{ calification: { type: Number, required: true }, name: { type: String, required: true }, email: { type: String }, title: { type: String }, review: { type: String, required: true }, createdAt: { type: Date } }]
},{
  timestamps: true
})

productSchema.index({ name: 'text', tags: 'text' })

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
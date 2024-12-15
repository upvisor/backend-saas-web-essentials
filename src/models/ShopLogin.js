import mongoose from 'mongoose'

const ShopLoginSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    type: { type: String, required: true },
    permissions: [{ type: String }]
}, {
    timestamps: true
})

const ShopLogin = mongoose.models.ShopLogin || mongoose.model('ShopLogin', ShopLoginSchema)

export default ShopLogin
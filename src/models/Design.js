import mongoose from 'mongoose'

const DesignSchema = new mongoose.Schema({
    header: {
        topStrip: { type: String }
    },
    home: {
        banner: [{
            image: { type: String },
            title: { type: String },
            text: { type: String },
            textButton: { type: String },
            linkButton: { type: String }
        }],
        category: {
            titleCategory: { type: Boolean },
            descriptionCategory: { type: Boolean }
        },
        products: {
            title: { type: String },
            sectionProducts: { type: String },
            category: { type: String }
        }
    },
    product: {
        title: { type: String },
        sectionProducts: { type: String },
        category: { type: String }
    },
    contact: {
        title: { type: String },
        text: { type: String },
        titleForm: { type: String }
    },
    shop: {
        title: { type: String },
        description: { type: String },
        banner: { type: String }
    },
    subscription: {
        title: { type: String }
    },
    cart: {
        title: { type: String },
        sectionProducts: { type: String },
        category: { type: String }
    }
}, {
    timestamps: true
})

const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)

export default Design
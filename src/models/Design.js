import mongoose from 'mongoose'

const DesignSchema = new mongoose.Schema({
    header: {
        topStrip: { type: String }
    },
    home: {
        banner: [{
            image: { public_id: { type: String }, url: { type: String } },
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
        },
        seo: {
            metaTitle: { type: String },
            metaDescription: { type: String }
        }
    },
    product: {
        titleInfo: { type: String },
        textInfo: { type: String },
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
        banner: { public_id: { type: String }, url: { type: String } },
        metaTitle: { type: String },
        metDescription: { type: String }
    },
    subscription: {
        title: { type: String },
        affair: { type: String },
        titleEmail: { type: String },
        textEmail: { type: String },
        textButton: { type: String },
        linikButton: { type: String }
    },
    cart: {
        title: { type: String },
        sectionProducts: { type: String },
        category: { type: String }
    },
    blog: {
        metaTitle: { type: String },
        metaDescription: { type: String }
    },
    popup: {
        title: { type: String },
        description: { type: String },
        tag: { type: String }
    }
}, {
    timestamps: true
})

const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)

export default Design
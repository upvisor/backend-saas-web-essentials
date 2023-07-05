import mongoose from 'mongoose'

const DesignSchema = new mongoose.Schema([
    {
        header: {
            topStrip: { type: String }
        }
    },
    {
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
                sectionProducts: { type: String }
            }
        }
    },
    {
        productPage: {

        }
    },
    {
        contactPage: {
            title: { type: String },
            text: { type: String },
            titleForm: { type: String }
        }
    },
    {
        shopPage: {
            title: { type: String },
            description: { type: String }
        }
    },
    {
        subscriptionZone: {
            title: { type: String }
        }
    }
], {
    timestamps: true
})

const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)

export default Design
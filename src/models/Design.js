import mongoose from 'mongoose'

const DesignSchema = new mongoose.Schema({
    header: {
        topStrip: { type: String }
    },
    pages: [{ page: { type: String }, slug: { type: String }, header: { type: Boolean }, metaTitle: { type: String }, metaDescription: { type: String }, design: [{ content: { type: String }, info: { banner: [{ title: { type: String }, description: { type: String }, button: { type: String }, buttonLink: { type: String }, image: { public_id: { type: String }, url: { type: String } } }], title: { type: String }, subTitle: { type: String }, description: { type: String }, image: { public_id: { type: String }, url: { type: String } }, titleForm: { type: String }, button: { type: String }, buttonLink: { type: String }, subTitle2: { type: String }, description2: { type: String }, button2: { type: String }, buttonLink2: { type: String }, subTitle3: { type: String }, description3: { type: String }, button3: { type: String }, buttonLink3: { type: String }, descriptionView: { type: Boolean }, products: { type: String } } }] }]
}, {
    timestamps: true
})

const Design = mongoose.models.Design || mongoose.model('Design', DesignSchema)

export default Design
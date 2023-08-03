import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: [{ type: { type: String }, html: { type: String }, content: { type: String }, image: { public_id: { type: String }, url: { type: String } } }],
    state: { type: Boolean, required: true },
    image: { public_id: '', url: '' },
    titleSeo: { type: String },
    descriptionSeo: { type: String }
})

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

export default Post
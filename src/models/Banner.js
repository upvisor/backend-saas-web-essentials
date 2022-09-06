import mongoose from 'mongoose'

const BannerSchema = mongoose.Schema({
    bannerTienda: {
        url: String,
        public_id: String
    },
    bannerTiendaCel: {
        url: String,
        public_id: String
    },
    bannerOferta: {
        url: String,
        public_id: String
    },
    bannerOfertaCel: {
        url: String,
        public_id: String
    }
})

export default mongoose.model('Banner', BannerSchema)
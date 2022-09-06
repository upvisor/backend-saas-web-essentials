import mongoose from 'mongoose'

const BannerInicioSchema = mongoose.Schema({
    imagenBanner1: {
        url: String,
        public_id: String
    },
    imagenBanner1Cel: {
        url: String,
        public_id: String
    },
    linkBanner1: {
        type: String,
        trim: true
    },
    imagenBanner2: {
        url: String,
        public_id: String
    },
    imagenBanner2Cel: {
        url: String,
        public_id: String
    },
    linkBanner2: {
        type: String,
        trim: true
    },
    imagenBanner3: {
        url: String,
        public_id: String
    },
    imagenBanner3Cel: {
        url: String,
        public_id: String
    },
    linkBanner3: {
        type: String,
        trim: true
    }
})

export default mongoose.model('BannerInicio', BannerInicioSchema)
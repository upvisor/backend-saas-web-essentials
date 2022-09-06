import Banner from '../models/Banner.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const createBanner = async (req, res) => {
    try {
        let bannerTienda
        if (req.files?.bannerTienda) {
            const result = await uploadImage(req.files.bannerTienda.tempFilePath)
            await fs.remove(req.files.bannerTienda.tempFilePath)
            bannerTienda = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let bannerTiendaCel
        if (req.files?.bannerTiendaCel) {
            const result = await uploadImage(req.files.bannerTiendaCel.tempFilePath)
            await fs.remove(req.files.bannerTiendaCel.tempFilePath)
            bannerTiendaCel = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let bannerOferta
        if (req.files?.bannerOferta) {
            const result = await uploadImage(req.files.bannerOferta.tempFilePath)
            await fs.remove(req.files.bannerOferta.tempFilePath)
            bannerOferta = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let bannerOfertaCel
        if (req.files?.bannerOfertaCel) {
            const result = await uploadImage(req.files.bannerOfertaCel.tempFilePath)
            await fs.remove(req.files.bannerOfertaCel.tempFilePath)
            bannerOfertaCel = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const banner = new Banner({bannerTienda, bannerTiendaCel, bannerOferta, bannerOfertaCel})
        await banner.save()
        return res.json(banner)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getBanner = async (req, res) => {
    try {
        const banner = await Banner.find()
        res.send(banner)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
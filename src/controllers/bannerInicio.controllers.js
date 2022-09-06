import BannerInicio from '../models/BannerInicio.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const createBannerInicio = async (req, res) => {
    try {
        const {linkBanner1, linkBanner2, linkBanner3} = req.body
        let imagenBanner1
        if (req.files?.imagenBanner1) {
            const result = await uploadImage(req.files.imagenBanner1.tempFilePath)
            await fs.remove(req.files.imagenBanner1.tempFilePath)
            imagenBanner1 = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let imagenBanner1Cel
        if (req.files?.imagenBanner1Cel) {
            const result = await uploadImage(req.files.imagenBanner1Cel.tempFilePath)
            await fs.remove(req.files.imagenBanner1Cel.tempFilePath)
            imagenBanner1Cel = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let imagenBanner2
        if (req.files?.imagenBanner2) {
            const result = await uploadImage(req.files.imagenBanner2.tempFilePath)
            await fs.remove(req.files.imagenBanner2.tempFilePath)
            imagenBanner2 = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let imagenBanner2Cel
        if (req.files?.imagenBanner2Cel) {
            const result = await uploadImage(req.files.imagenBanner2Cel.tempFilePath)
            await fs.remove(req.files.imagenBanner2Cel.tempFilePath)
            imagenBanner2Cel = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let imagenBanner3
        if (req.files?.imagenBanner3) {
            const result = await uploadImage(req.files.imagenBanner3.tempFilePath)
            await fs.remove(req.files.imagenBanner3.tempFilePath)
            imagenBanner3 = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        let imagenBanner3Cel
        if (req.files?.imagenBanner3Cel) {
            const result = await uploadImage(req.files.imagenBanner3Cel.tempFilePath)
            await fs.remove(req.files.imagenBanner3Cel.tempFilePath)
            imagenBanner3Cel = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const bannerInicio = new BannerInicio({imagenBanner1, imagenBanner1Cel, linkBanner1, imagenBanner2, imagenBanner2Cel, linkBanner2, imagenBanner3, imagenBanner3Cel, linkBanner3})
        await bannerInicio.save()
        return res.json(bannerInicio)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getBannerInicio = async (req, res) => {
    try {
        const bannerInicio = await BannerInicio.find()
        res.send(bannerInicio)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
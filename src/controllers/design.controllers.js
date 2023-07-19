import Design from '../models/Design.js'

export const createDesign = async (req, res) => {
    try {
        const design = await Design.findOne().lean()
        if (design) {
            const deleteDesign = await Design.findByIdAndDelete(design._id)
            if (deleteDesign.home.banner.length) {
                deleteDesign.home.banner.map(async (banner) => await deleteImage(banner.public_id))
            }
            if (deleteDesign.shop.banner.url) {
                await deleteImage(deleteDesign.shop.banner.public_id)
            }
        }
        const newDesign = new Design(req.body)
        await newDesign.save()
        return res.send(newDesign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getDesign = async (req, res) => {
    try {
        const design = await Design.findOne().lean()
        return res.send(design)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
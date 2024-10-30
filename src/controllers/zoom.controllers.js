import axios from 'axios'
import Zoom from '../models/Zoom.js'

export const createToken = async (req, res) => {
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                "grant_type": "account_credentials",
                "account_id": process.env.ZOOM_ACCOUNT_ID
            }
        })
        const zoom = await Zoom.findOne()
        if (zoom) {
            await Zoom.findByIdAndUpdate(zoom._id, response.data, { new: true })
        } else {
            const newToken = new Zoom(response.data)
            await newToken.save()
        }
        return res.json(response.data)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
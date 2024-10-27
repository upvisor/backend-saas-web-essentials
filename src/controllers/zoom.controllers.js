import axios from 'axios'

export const createToken = async (req, res) => {
    try {
        const code = req.query.code
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: `${process.env.API_URL}/zoom-token`
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
            }
        })
        return res.json(response.data.access_token)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
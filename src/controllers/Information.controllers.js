import Information from '../models/Information.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createInformation = async (req, res) => {
    try {
        const { cart, fbp, fbc } = req.body
        const CustomData = bizSdk.CustomData
        const EventRequest = bizSdk.EventRequest
        const UserData = bizSdk.UserData
        const ServerEvent = bizSdk.ServerEvent
        const access_token = process.env.APIFACEBOOK_TOKEN
        const pixel_id = process.env.APIFACEBOOK_PIXELID
        const api = bizSdk.FacebookAdsApi.init(access_token)
        let current_timestamp = new Date()
        const url = `${process.env.WEB_URL}/finalizar-compra/`
        const userData = (new UserData())
            .setClientIpAddress(req.connection.remoteAddress)
            .setClientUserAgent(req.headers['user-agent'])
            .setFbp(fbp)
            .setFbc(fbc)
        let value
        if ( cart.length ) {
            value = cart.reduce((prev, current) => prev + (current.price * current.quantity), 0)
        } else {
            value = cart.price * cart.quantity
        }
        const customData = (new CustomData())
            .setCurrency('clp')
            .setValue(value)
        const serverEvent = (new ServerEvent())
            .setEventName('AddPaymentInfo')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl(url)
            .setActionSource('website')
        const eventsData = [serverEvent]
        const eventRequest = (new EventRequest(access_token, pixel_id))
            .setEvents(eventsData)
            eventRequest.execute().then(
                response => {
                    console.log('Response: ', response)
                },
                err => {
                    console.error('Error: ', err)
                }
            )
        const nuevoFinalizar = new Information({cart})
        await nuevoFinalizar.save()
        return res.json(nuevoFinalizar)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getInformation = async (req, res) => {
    try {
        const finalizar = await Information.find()
        res.send(finalizar)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
import Suscripcion from '../models/Suscripcion.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createSuscripcion = async (req, res) => {
    try {
        const { email, fbp, fbc } = req.body
        const EventRequest = bizSdk.EventRequest
        const UserData = bizSdk.UserData
        const ServerEvent = bizSdk.ServerEvent
        const access_token = process.env.APIFACEBOOK_TOKEN
        const pixel_id = process.env.APIFACEBOOK_PIXELID
        const api = bizSdk.FacebookAdsApi.init(access_token)
        let current_timestamp = new Date()
        const userData = (new UserData())
            .setEmail(email)
            .setClientIpAddress(req.connection.remoteAddress)
            .setClientUserAgent(req.headers['user-agent'])
            .setFbp(fbp)
            .setFbc(fbc)
        const serverEvent = (new ServerEvent())
            .setEventName('AddPaymentInfo')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setEventSourceUrl('https://blaspod.cl/finalizar')
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
        const fecha = new Date()
        const nuevaSuscripcion = new Suscripcion({email, fecha})
        await nuevaSuscripcion.save()
        return res.json(nuevaSuscripcion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSuscripcion = async (req, res) => {
    try {
        const suscripciones = await Suscripcion.find()
        res.send(suscripciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
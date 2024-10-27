import StoreData from '../models/StoreData.js'
import { sendEmail } from '../utils/sendEmail.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createSubscription = async (req, res) => {
    try {
        const EventRequest = bizSdk.EventRequest
        const UserData = bizSdk.UserData
        const ServerEvent = bizSdk.ServerEvent
        const access_token = process.env.APIFACEBOOK_TOKEN
        const pixel_id = process.env.APIFACEBOOK_PIXELID
        const api = bizSdk.FacebookAdsApi.init(access_token)
        let current_timestamp = Math.floor(new Date() / 1000)
        const userData = (new UserData())
            .setEmail(req.body.email)
            .setClientIpAddress(req.connection.remoteAddress)
            .setClientUserAgent(req.headers['user-agent'])
            .setFbp(req.body.fbp)
            .setFbc(req.body.fbc)
        const serverEvent = (new ServerEvent())
            .setEventId(req.body.eventId)
            .setEventName('Lead')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setEventSourceUrl(`${process.env.WEB_URL}${req.body.page}`)
            .setActionSource('website')
        const eventsData = [serverEvent];
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
        const storeData = await StoreData.findOne().lean()
        sendEmail({ address: req.body.email, affair: '¡Te damos la bienvenida a Blaspod Store!', paragraph: '¡Hola! Te queremos dar las gracias por suscribirte a nuestra lista, nos hace muy felices tenerte con nosotros.', buttonText: 'Visitar tienda', title: 'Te has suscrito a nuestra lista con exito', name: '', storeData: storeData, url: 'https://tienda-1.vercel.app/tienda' })
        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
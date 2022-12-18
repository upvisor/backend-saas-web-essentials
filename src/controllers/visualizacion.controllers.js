import Visualizacion from '../models/Visualizacion.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createVisualizacion = async (req, res) => {
    try {
        const {producto, precio, url, fbp, fbc} = req.body
        const CustomData = bizSdk.CustomData
        const EventRequest = bizSdk.EventRequest
        const UserData = bizSdk.UserData
        const ServerEvent = bizSdk.ServerEvent
        const access_token = process.env.APIFACEBOOK_TOKEN
        const pixel_id = process.env.APIFACEBOOK_PIXELID
        const api = bizSdk.FacebookAdsApi.init(access_token)
        let current_timestamp = new Date()
        const userData = (new UserData())
            .setClientIpAddress(req.connection.remoteAddress)
            .setClientUserAgent(req.headers['user-agent'])
            .setFbp(fbp)
            .setFbc(fbc)
        const customData = (new CustomData())
            .setContentName(producto)
            .setCurrency('clp')
            .setValue(precio)
        const serverEvent = (new ServerEvent())
            .setEventName('ViewContent')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl(`https://blaspod.cl/productos/${url}`)
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
            );
        const fecha = new Date()
        const nuevaVisualizacion = new Visualizacion({producto, precio, fecha})
        await nuevaVisualizacion.save()
        return res.json(nuevaVisualizacion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getVisualizacion = async (req, res) => {
    try {
        const visualizaciones = await Visualizacion.find()
        res.send(visualizaciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
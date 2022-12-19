import Añadir from '../models/Añadir.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createAñadir = async (req, res) => {
    try {
        const {cantidadProductos, nombre, precio, fecha, fbp, fbc, url} = req.body
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
            .setContentName(nombre)
            .setCurrency('clp')
            .setValue(precio)
        const serverEvent = (new ServerEvent())
            .setEventName('AddToCart')
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
            )
        const nuevoAñadir = new Añadir({cantidadProductos, nombre, precio, fecha})
        await nuevoAñadir.save()
        return res.json(nuevoAñadir)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAñadir = async (req, res) => {
    try {
        const datos = await Añadir.find()
        res.send(datos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
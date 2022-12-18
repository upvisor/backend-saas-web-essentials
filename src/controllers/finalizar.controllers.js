import Finalizar from '../models/Finalizar.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createFinalizar = async (req, res) => {
    try {
        const { carrito, fbp, fbc } = req.body
        const Content = bizSdk.Content
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
        let content = []
        if ( carrito.length ) {
            carrito.map(producto => {
                content = [...content, 
                    (new Content())
                        .setTitle(producto.nombre)
                        .setItemPrice(producto.precio)
                        .setQuantity(producto.cantidadProductos)
                ]
            })
        } else {
            content = (new Content())
                .setTitle(carrito.nombre)
                .setItemPrice(carrito.precio)
                .setQuantity(carrito.cantidadProductos)
        }
        let value
        if ( carrito.length ) {
            value = carrito.reduce((prev, current) => prev + (current.precio * current.cantidadProductos), 0)
        } else {
            value = carrito.precio * carrito.cantidadProductos
        }
        const customData = (new CustomData())
            .setContents(content)
            .setCurrency('clp')
            .setValue(value)
        const serverEvent = (new ServerEvent())
            .setEventName('AddPaymentInfo')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
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
        const nuevoFinalizar = new Finalizar({carrito, fecha})
        await nuevoFinalizar.save()
        return res.json(nuevoFinalizar)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getFinalizar = async (req, res) => {
    try {
        const finalizar = await Finalizar.find()
        res.send(finalizar)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
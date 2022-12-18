import Compra from '../models/Compra.js'
import bizSdk from 'facebook-nodejs-business-sdk'
import sha256 from 'crypto-js/sha256.js'

export const createCompra = async (req, res) => {
    try {
        const {email, region, ciudad, nombre, apellido, direccion, departamento, telefono, cupon, carrito, envio, estado, pago, fecha, fbp, fbc} = req.body
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
            .setEmail(sha256(email))
            .setPhone(sha256(telefono))
            .setFirstName(sha256(nombre))
            .setCity(sha256(ciudad))
            .setCountry(sha256('cl'))
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
            .setEventName('InitiateCheckout')
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
        const cuponUpper = cupon.toUpperCase()
        const nuevaCompra = new Compra({email, region, ciudad, nombre, apellido, direccion, departamento, telefono, cupon: cuponUpper, carrito, envio, estado, pago, fecha})
        await nuevaCompra.save()
        return res.json(nuevaCompra)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCompras = async (req, res) => {
    try {
        const compras = await Compra.find()
        res.send(compras)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCompra = async (req, res) => {
    try {
        const compra = await Compra.findById(req.params.id)
        if (!compra) return res.sendStatus(404)
        res.json(compra)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCompra = async (req, res) => {
    try {
        const { compra, fbp, fbc } = req.body
        const updateCompra = await Compra.findByIdAndUpdate(req.params.id, compra, {new: true})
        if (req.body.estado === 'Pago realizado') {
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
                .setEmail(sha256(compra.email))
                .setPhone(sha256(compra.telefono))
                .setFirstName(sha256(compra.nombre))
                .setCity(sha256(compra.ciudad))
                .setCountry(sha256('cl'))
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
                .setEventName('Pucharse')
                .setEventTime(current_timestamp)
                .setUserData(userData)
                .setCustomData(customData)
                .setEventSourceUrl('https://blaspod.cl/gracias-por-comprar')
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
        }
        return res.send(updateCompra)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
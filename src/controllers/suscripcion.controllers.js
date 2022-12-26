import Suscripcion from '../models/Suscripcion.js'
import bizSdk from 'facebook-nodejs-business-sdk'
import nodemailer from 'nodemailer'

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
            .setEventName('Lead')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setEventSourceUrl('https://blaspod.cl/')
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
        const enviarMail = async () => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    password: process.env.EMAIL_PASSWORD
                }
            })
            await transporter.sendMail({
                from: 'contacto@blaspod.cl',
                to: email,
                subject: '<p>¡Te damos la Bienvenida a Blaspod Store! Nos hace muy felices tenerte con nosotros</p>',
                html: '<p>Hola</p>'
            })
        }
        enviarMail()
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
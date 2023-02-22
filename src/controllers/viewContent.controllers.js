import ViewContent from '../models/ViewContent.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const createViewContent = async (req, res) => {
    try {
        const {name, price, category, url, fbp, fbc} = req.body
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
            .setContentName(name)
            .setCurrency('clp')
            .setValue(price)
        const serverEvent = (new ServerEvent())
            .setEventName('ViewContent')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl(`${process.env.WEB_URL}/${url}`)
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
        const nuevaVisualizacion = new ViewContent({name, price, category})
        await nuevaVisualizacion.save()
        return res.json(nuevaVisualizacion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getViewContent = async (req, res) => {
    try {
        const visualizaciones = await ViewContent.find()
        res.send(visualizaciones)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
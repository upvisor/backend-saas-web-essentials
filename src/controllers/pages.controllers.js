import Page from '../models/Page.js'
import bizSdk from 'facebook-nodejs-business-sdk'

export const pageView = async (req, res) => {
    try {
        const CustomData = bizSdk.CustomData
        const EventRequest = bizSdk.EventRequest
        const UserData = bizSdk.UserData
        const ServerEvent = bizSdk.ServerEvent
        const access_token = process.env.APIFACEBOOK_TOKEN
        const pixel_id = process.env.APIFACEBOOK_PIXELID
        if (access_token && pixel_id) {
            const api = bizSdk.FacebookAdsApi.init(access_token)
            let current_timestamp = Math.floor(new Date() / 1000)
            const userData = (new UserData())
                .setClientIpAddress(req.connection.remoteAddress)
                .setClientUserAgent(req.headers['user-agent'])
                .setFbp(req.body.fbp)
                .setFbc(req.body.fbc)
            const customData = (new CustomData())
                .setContentName(req.body.service)
            const serverEvent = (new ServerEvent())
                .setEventId(req.body.eventId)
                .setEventName('PageView')
                .setEventTime(current_timestamp)
                .setUserData(userData)
                .setCustomData(customData)
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
        }
        const newPage = new Page(req.body)
        const newPageSave = await newPage.save()
        return res.json(newPageSave)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
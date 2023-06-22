import Email from '../models/Email.js'
import cron from 'node-cron'
import { sendEmail } from '../utils/sendEmail.js'
import { formatDateToCron } from '../utils/cronFormat.js'
import Client from '../models/Client.js'
import StoreData from '../models/StoreData.js'

export const createCampaign = async (req, res) => {
    try {
        const { address, affair, summary, title, paragraph, buttonText, url, date } = req.body
        const newCampaign = new Email({ address, affair, summary, title, paragraph, buttonText, url, date: date === undefined ? new Date() : date })
        await newCampaign.save()
        let subscribers = []
        if (address === 'Todos los suscriptores') {
            subscribers = await Client.find().lean()
        } else {
            subscribers = await Client.find({ tags: address }).lean()
        }
        if (date === undefined) {
            const storeData = await StoreData.find()
            subscribers.map(subscriber => {
                sendEmail({ address: subscriber.email, name: subscriber.firstName !== undefined ? subscriber.firstName : '', affair, title, paragraph, buttonText, url, storeData: storeData[0] }).catch(console.error)
            })
        } else {
            const storeData = await StoreData.find()
            const dateFormat = new Date(date)
            const format = formatDateToCron(dateFormat)
            cron.schedule(format, () => {
                subscribers.map(subscriber => {
                    sendEmail({ address: subscriber.email, name: subscriber.firstName !== undefined ? subscriber.firstName : '', affair, title, paragraph, buttonText, url, storeData: storeData[0] }).catch(console.error)
                })
            }, {
                scheduled: true,
                timezone: "America/New_York"
            })
        }
        return res.send(newCampaign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Email.find().lean()
        return res.send(campaigns)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
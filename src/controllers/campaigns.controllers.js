import Email from '../models/Email.js'
import cron from 'node-cron'
import { sendEmailCampaign } from '../utils/sendEmailCampaign.js'
import { formatDateToCron } from '../utils/cronFormat.js'
import Client from '../models/Client.js'
import StoreData from '../models/StoreData.js'
import CampaignTrack from '../models/CampaignTrack.js'

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
                sendEmailCampaign({ address: subscriber.email, name: subscriber.firstName !== undefined ? subscriber.firstName : '', affair, title, paragraph, buttonText, url, storeData: storeData[0] }).catch(console.error)
            })
        } else {
            const storeData = await StoreData.find()
            const dateFormat = new Date(date)
            const format = formatDateToCron(dateFormat)
            cron.schedule(format, () => {
                subscribers.map(subscriber => {
                    sendEmailCampaign({ address: subscriber.email, name: subscriber.firstName !== undefined ? subscriber.firstName : '', affair, title, paragraph, buttonText, url, storeData: storeData[0] }).catch(console.error)
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

export const getCampaign = async (req, res) => {
    try {
        const campaign = await Email.findById(req.params.id)
        if (!campaign) {
            return res.sendStatus(404)
        }
        return res.send(campaign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const trackCampaign = async (req, res) => {
    try {
        const campaign = req.query.campaign
        console.log(campaign)
        const trackCampaign = new CampaignTrack({ campaign: campaign, email: req.params.id })
        await trackCampaign.save()
        return res.send(trackCampaign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
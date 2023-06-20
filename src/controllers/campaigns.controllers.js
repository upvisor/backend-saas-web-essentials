import Email from '../models/Email.js'
import cron from 'node-cron'
import { sendEmail } from '../utils/sendEmail.js'
import { formatDateToCron } from '../utils/cronFormat.js'
import Client from '../models/Client.js'

export const createCampaign = async (req, res) => {
    try {
        const { address, affair, summary, title, paragraph, buttonText, url, date } = req.body
        const newCampaign = new Email({ address, affair, summary, title, paragraph, buttonText, url, date })
        await newCampaign.save()
        const format = formatDateToCron(date)
        let subscribers = []
        if (address === 'Todos los suscriptores') {
            subscribers = await Client.find().lean()
        }
        cron.schedule(format, () => {
            subscribers.map(subscriber => {
                const mail = subscriber.email
                sendEmail({ mail, affair, title, paragraph, buttonText, url })
            })
        })
        return res.send(newCampaign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
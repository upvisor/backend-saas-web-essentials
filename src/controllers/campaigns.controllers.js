import Email from '../models/Email.js'
import cron from 'node-cron'
import { sendEmail } from '../utils/sendEmail.js'
import { formatDateToCron } from '../utils/cronFormat.js'

export const createCampaign = async (req, res) => {
    try {
        const { address, affair, summary, title, paragraph, buttonText, url, date } = req.body
        const newCampaign = new Email({ address, affair, summary, title, paragraph, buttonText, url, date })
        await newCampaign.save()
        const format = formatDateToCron(date)
        cron.schedule(format, () => {
          sendEmail()
        })
        return res.send(newCampaign)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
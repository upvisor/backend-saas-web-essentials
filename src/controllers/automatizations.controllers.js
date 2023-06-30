import Automatization from '../models/Automatization.js'
import Client from '../models/Client.js'
import StoreData from '../models/StoreData.js'
import { sendEmail } from '../utils/sendEmail.js'
import { formatDateToCron } from '../utils/cronFormat.js'
import cron from 'node-cron'

export const createAutomatization = async (req, res) => {
    try {
        const { address, name, date, automatization } = req.body
        const emails = []
        let previousDate = new Date(date)
        for (const email of automatization) {
            const currentDate = new Date(previousDate)
            if (email.time === 'Días') {
                currentDate.setDate(currentDate.getDate() + Number(email.number))
            } else if (email.time === 'Horas') {
                currentDate.setHours(currentDate.getHours() + Number(email.number))
            } else if (email.time === 'Minutos') {
                currentDate.setMinutes(currentDate.getMinutes() + Number(email.number))
            }
            email.date = currentDate
            emails.push(email)
            previousDate = currentDate
        }
        const newAutomatization = new Automatization({ address, name, automatization: emails })
        await newAutomatization.save()
        let subscribers = []
        if (address === 'Todos los suscriptores') {
            subscribers = await Client.find().lean()
        } else {
            subscribers = await Client.find({ tags: address }).lean()
        }
        emails.map(async (email) => {
            const storeData = await StoreData.find().lean()
            const dateFormat = new Date(email.date)
            const format = formatDateToCron(dateFormat)
            cron.schedule(format, () => {
                subscribers.map(subscriber => {
                    sendEmail({ address: subscriber.email, name: subscriber.firstName !== undefined ? subscriber.firstName : '', affair: email.affair, title: email.title, paragraph: email.paragraph, buttonText: email.buttonText, url: email.url, storeData: storeData[0] }).catch(console.error)
                })
            }, {
                scheduled: true,
                timezone: "America/New_York"
            })
        })
        return res.send(newAutomatization)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAutomatizations = async (req, res) => {
    try {
        const automatizations = await Automatization.find().lean()
        return res.send(automatizations)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
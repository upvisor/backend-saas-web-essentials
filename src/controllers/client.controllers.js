import Client from '../models/Client.js'
import Automatization from '../models/Automatization.js'
import StoreData from '../models/StoreData.js'
import { sendEmailAutomatization } from '../utils/sendEmailAutomatization.js'
import { formatDateToCron } from '../utils/cronFormat.js'
import cron from 'node-cron'

export const createClient = async (req, res) => {
  try {
    const client = await Client.findOne({email: req.body.email}).lean()
    if (client) {
      const clientTagsSet = new Set(client.tags)
      const reqBodyTagsSet = new Set(req.body.tags)
      reqBodyTagsSet.forEach(tag => clientTagsSet.add(tag))
      const updatedTags = Array.from(clientTagsSet)
      client.tags = updatedTags
      const editClien = await Client.findByIdAndUpdate(client._id, client, { new: true })
      const automatizations = await Automatization.find().lean()
      const automatizationsClient = automatizations.filter(automatization => automatization.address === client.tags || automatization.address === 'Todos los suscriptores')
      let emails = []
      automatizationsClient.map(async (automatization) => {
          let previousDate = new Date()
          previousDate.setMinutes(previousDate.getMinutes() + 1)
          previousDate.setHours(previousDate.getHours() - 4)
          for (const email of automatization.automatization) {
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
          emails.map(async (email) => {
              const storeData = await StoreData.find().lean()
              const dateFormat = new Date(email.date)
              const format = formatDateToCron(dateFormat)
              cron.schedule(format, () => {
                  sendEmailAutomatization({ address: client.email, name: client.firstName !== undefined ? client.firstName : '', affair: email.affair, title: email.title, paragraph: email.paragraph, buttonText: email.buttonText, url: email.url, storeData: storeData[0] }).catch(console.error)
              }, {
                  scheduled: true,
                  timezone: "America/New_York"
              })
          })
      })
      return res.send(editClien)
    } else {
      const newClient = new Client(req.body)
      await newClient.save()
      const automatizations = await Automatization.find().lean()
      const automatizationsClient = automatizations.filter(automatization => automatization.address === newClient.tags || automatization.address === 'Todos los suscriptores')
      let emails = []
      automatizationsClient.map(async (automatization) => {
          let previousDate = new Date()
          previousDate.setMinutes(previousDate.getMinutes() + 1)
          previousDate.setHours(previousDate.getHours() - 4)
          for (const email of automatization.automatization) {
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
          emails.map(async (email) => {
              const storeData = await StoreData.find().lean()
              const dateFormat = new Date(email.date)
              const format = formatDateToCron(dateFormat)
              cron.schedule(format, () => {
                  sendEmailAutomatization({ address: client.email, name: client.firstName !== undefined ? client.firstName : '', affair: email.affair, title: email.title, paragraph: email.paragraph, buttonText: email.buttonText, url: email.url, storeData: storeData[0] }).catch(console.error)
              }, {
                  scheduled: true,
                  timezone: "America/New_York"
              })
          })
      })
      return res.json(newClient)
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find()

    if (!clients) {
      return undefined
    }

    return res.json(clients)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const updateClient = async (req, res) => {
  try {
    const updateClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.send(updateClient)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)

    if (!client) {
      return undefined
    }

    return res.send(client)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
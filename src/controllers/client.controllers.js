import Client from '../models/Client.js'
import StoreData from '../models/StoreData.js'
import { sendEmail } from '../utils/sendEmail.js'

export const createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body)
    await newClient.save()
    return res.json(newClient)
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

export const subscribeEmail = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.params.id })
    if (client.tags?.length) {
      if (client.tags.find(tag => tag === 'Suscriptores')) {
        client.tags.push(['Suscriptores'])
        const storeData = await StoreData.findOne().lean()
        sendEmail({ address: req.params.id, affair: '¡Te damos la bienvenida a Blaspod Store!', name: '', storeData: storeData, buttonText: 'Visitar tienda', title: 'Nos hace muy felices tenerte con nosotros', paragraph: '¡Hola! Te damos las gracias por suscribirte a nuestra lista, nos hace muy felices tenerte con nosotros.', url: 'https://tienda-1.vercel.app/tienda' })
      }
    } else {
      client.tags = ['Suscriptores']
      const storeData = await StoreData.findOne().lean()
      sendEmail({ address: req.params.id, affair: '¡Te damos la bienvenida a Blaspod Store!', name: '', storeData: storeData, buttonText: 'Visitar tienda', title: 'Nos hace muy felices tenerte con nosotros', paragraph: '¡Hola! Te damos las gracias por suscribirte a nuestra lista, nos hace muy felices tenerte con nosotros.', url: 'https://tienda-1.vercel.app/tienda' })
    }
    await client.save()
    return res.send(client)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
import Client from '../models/Client.js'

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
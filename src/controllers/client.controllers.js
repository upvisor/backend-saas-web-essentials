import Client from '../models/Client.js'

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
      return res.send(editClien)
    } else {
      const newClient = new Client(req.body)
      await newClient.save()
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
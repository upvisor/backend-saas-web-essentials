import Session from '../models/Session.js'
import Page from '../models/Page.js'
import Lead from '../models/Lead.js'
import Client from '../models/Client.js'

export const getStadistics = async (req, res) => {
    try {
        const pages = await Page.find()
        const sessions = await Session.find()
        const leads = await Lead.find()
        const clients = await Client.find()
        return res.json({ sessions, pages, leads, clients })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getStadisticsFiltered = async (req, res) => {
    try {
        const {dateInitial, dateLast} = req.body
        const dateInitialFormat = new Date(dateInitial)
        const dateLastFormat = new Date(dateLast)
        const pages = await Page.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        const sessions = await Session.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        const leads = await Lead.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        const clients = await Client.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        return res.json({ sessions, pages, leads, clients })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
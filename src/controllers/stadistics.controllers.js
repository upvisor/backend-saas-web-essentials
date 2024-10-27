import Session from '../models/Session.js'
import Checkout from '../models/Checkout.js'
import Pay from '../models/Pay.js'
import Page from '../models/Page.js'
import Lead from '../models/Lead.js'
import Client from '../models/Client.js'
import Meeting from '../models/Meeting.js'

export const getStadistics = async (req, res) => {
    try {
        const pages = await Page.find()
        const sessions = await Session.find()
        const leads = await Lead.find()
        const meetings = await Meeting.find()
        const checkouts = await Checkout.find()
        const pays = await Pay.find()
        const clients = await Client.find()
        return res.json({ sessions, checkouts, pays, pages, leads, clients, meetings })
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
        const meetings = await Meeting.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        const checkouts = await Checkout.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        const pays = await Pay.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        const clients = await Client.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
        return res.json({ sessions, checkouts, pays, pages, leads, clients, meetings })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
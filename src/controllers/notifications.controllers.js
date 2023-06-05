import Notification from '../models/Notification.js'

export const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification(req.body)
        await newNotification.save()
        return res.send(newNotification)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().lean()
        return res.send(notifications)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
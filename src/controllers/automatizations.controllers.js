import Automatization from '../models/Automatization.js'

export const createAutomatization = async (req, res) => {
    try {
        const { address, name, automatization } = req.body
        const emails = []
        let previousDate = new Date()
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
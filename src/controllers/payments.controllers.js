import Payment from '../models/Payment.js'

export const createPayment = async (req, res) => {
    try {
        const payment = await Payment.findOne()
        if (payment) {
            const paymentEdit = await Payment.findByIdAndUpdate(req.body._id, req.body, { new: true })
            return res.json(paymentEdit)
        } else {
            const newPayment = new Payment(req.body)
            const newPaymentSave = await newPayment.save()
            return res.json(newPaymentSave)
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findOne()
        return res.json(payment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
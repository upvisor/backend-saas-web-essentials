import { MercadoPagoConfig, Payment } from 'mercadopago';
import Paym from '../models/Payment.js'

export const createPay = async (req, res) => {
    try {
        const paymentData = await Paym.findOne()
        const client = new MercadoPagoConfig({ accessToken: paymentData.mercadoPago.accessToken, options: { timeout: 5000 } });
        const payment = new Payment(client);
        payment.create({ body: req.body })
            .then(async (response) => {
                return res.json(response)
            })
            .catch(async (error) => {
                console.log(error)
                return res.status(500).json({message: error.message})
            })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

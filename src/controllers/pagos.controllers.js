import axios from 'axios'

export const createOrder = async (req, res) => {
    const {buy_order, session_id, amount, return_url} = req.body
    const order = {
        "buy_order": buy_order,
        "session_id": session_id,
        "amount": amount,
        "return_url": return_url
    }
    const response = await axios.post(`${process.env.TRANSBANK_API}/rswebpaytransaction/api/webpay/v1.2/transactions`, order, {
        headers: {
            'Content-Type': 'application/json',
            'Tbk-Api-Key-Id': process.env.TRANSBANK_KEY_ID,
            'Tbk-Api-Key-Secret': process.env.TRANSBANK_KEY_SECRET
        }
    })
    res.send(response.data)
}

export const confirmOrder = async (req, res) => {
    try {
        const {token} = req.body
        const response = await axios.put(`${process.env.TRANSBANK_API}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
            headers: {
                'Content-Type': 'application/json',
                'Tbk-Api-Key-Id': process.env.TRANSBANK_KEY_ID,
                'Tbk-Api-Key-Secret': process.env.TRANSBANK_KEY_SECRET
            }
        })
        res.send(response.data)
    }
    catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const captureOrder = (req, res) => {
    res.send('Capturando orden')
}

export const cancelOrder = (req, res) => {
    res.send('Orden cancelada')
}
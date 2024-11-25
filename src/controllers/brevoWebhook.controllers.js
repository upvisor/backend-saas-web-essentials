import { updateClientEmailStatusById } from '../utils/updateEmail.js'

export const getStatus = async (req, res) => {
    const event = req.body.event;
    const email = req.body.email
    const emailId = req.body.headers ? req.body.headers['X-Unique-Id'] : null
    
    if (event === 'unique_opened') {
        await updateClientEmailStatusById(email, emailId, 'unique_opened');
    } else if (event === 'clicked') {
        await updateClientEmailStatusById(email, emailId, 'clicked');
    }

    res.status(200).send('Webhook received');
}
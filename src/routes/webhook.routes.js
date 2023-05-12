import {Router} from 'express'

const router = Router()

router.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'pugpizza_token') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Pug Pizza no tienes permisos.')
    }
})

export default router
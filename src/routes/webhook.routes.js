import {Router} from 'express'

const router = Router()

router.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'maaide_token') {
        console.log(req.query)
        console.log(req.body)
        res.send(req.query['hub.challenge'])
    } else {
        res.send('No tienes permisos.')
    }
})

export default router
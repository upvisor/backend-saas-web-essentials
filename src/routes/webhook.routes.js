import {Router} from 'express'

const router = Router()

router.get('/webhook', function(req, res) {
    console.log('hola')
    if (req.query['hub.verify_token'] === 'maaide_token') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('No tienes permisos.')
    }
})

export default router
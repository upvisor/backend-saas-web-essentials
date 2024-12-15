import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {connectDB} from './db.js'
import http from 'http'
import {Server as SocketServer} from 'socket.io'
import { loadTasks } from './utils/tasks.js'

import contactRoutes from './routes/contact.routes.js'
import clientTagRoutes from './routes/clientTag.routes.js'
import clientsRoutes from './routes/client.routes.js'
import storeDataRoutes from './routes/storeData.routes.js'
import chatRoutes from './routes/chat.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import campaignRoutes from './routes/campaign.routes.js'
import automatizationsRoutes from './routes/automatizations.routes.js'
import politicsRoutes from './routes/politics.routes.js'
import designRoutes from './routes/design.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'
import shopLoginRoutes from './routes/shopLogin.routes.js'
import postRoutes from './routes/post.routes.js'
import emailRoutes from './routes/email.routes.js'
import sessionRoutes from './routes/session.routes.js'
import formsRoutes from './routes/form.routes.js'
import clientDataRoutes from './routes/clientData.router.js'
import bunnyRoutes from './routes/bunny.routes.js'
import stadisticsRoutes from './routes/stadistics.routes.js'
import pagesRoutes from './routes/pages.routes.js'
import leadsRoutes from './routes/leads.routes.js'
import desubscribesRoutes from './routes/desubscribes.routes.js'
import brevoWebhookRoutes from './routes/brevoWebhook.routes.js'

connectDB()

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    pingInterval: 10000,
    pingTimeout: 5000
})

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(express.urlencoded({extended: false}))

await loadTasks()

app.use(contactRoutes)
app.use(clientsRoutes)
app.use(clientTagRoutes)
app.use(storeDataRoutes)
app.use(chatRoutes)
app.use(notificationsRoutes)
app.use(campaignRoutes)
app.use(automatizationsRoutes)
app.use(politicsRoutes)
app.use(designRoutes)
app.use(subscriptionRoutes)
app.use(shopLoginRoutes)
app.use(postRoutes)
app.use(emailRoutes)
app.use(sessionRoutes)
app.use(formsRoutes)
app.use(clientDataRoutes)
app.use(bunnyRoutes)
app.use(stadisticsRoutes)
app.use(pagesRoutes)
app.use(leadsRoutes)
app.use(desubscribesRoutes)
app.use(brevoWebhookRoutes)

io.on('connection', async (socket) => {
    socket.on('message', async (message) => {
        socket.broadcast.emit('message', message)
    })
    socket.on('messageAdmin', (message) => {
        socket.broadcast.emit('messageAdmin', message)
    })
    socket.on('newNotification', (message) => {
        socket.broadcast.emit('newNotification', message)
    })
})

export { io }

server.listen(process.env.PORT || 3000)
console.log('Server on port', process.env.PORT || 3000)
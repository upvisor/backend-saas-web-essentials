import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {connectDB} from './db.js'
import http from 'http'
import {Server as SocketServer} from 'socket.io'
import ChatMessage from './models/Chat.js'

import productsRoutes from './routes/products.routes.js'
import addCartRoutes from './routes/addCart.routes.js'
import sellsRoutes from './routes/sells.routes.js'
import contactRoutes from './routes/contact.routes.js'
import informationRoutes from './routes/information.routes.js'
import subscribeRoutes from './routes/subscribe.routes.js'
import viewContentRoutes from './routes/viewContent.routes.js'
import stadisticsRoutes from './routes/stadistics.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
import aiDescriptionProductRoutes from './routes/aiDescriptionProduct.routes.js'
import aiDescriptionProductSeo from './routes/aiDescriptionProductSeo.routes.js'
import aiDescriptionCategoryRoutes from './routes/aiDescriptionCategory.routes.js'
import aiDescriptionCategorySeoRoutes from './routes/aiDescriptionCategorySeo.routes.js'
import aiTitleCategorySeoRoutes from './routes/aiTitleCategorySeo.routes.js'
import aiTitleProductSeoRoutes from './routes/aiTitleProductSeo.routes.js'
import promotionalCodeRoutes from './routes/promotionalCode.routes.js'
import clientTagRoutes from './routes/clientTag.routes.js'
import whatsappRoutes from './routes/whatsapp.routes.js'
import clientsRoutes from './routes/client.routers.js'
import storeDataRoutes from './routes/storeData.routes.js'
import chatRoutes from './routes/chat.routes.js'
import payRoutes from './routes/pay.routes.js'
import tagsRoutes from './routes/tags.routes.js'
import webhookRoutes from './routes/webhook.routes.js'
import messengerRoutes from './routes/messenger.routes.js'
import instagramRoutes from './routes/instagram.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'

connectDB()

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(express.urlencoded({extended: false}))

app.use(productsRoutes)
app.use(addCartRoutes)
app.use(sellsRoutes)
app.use(contactRoutes)
app.use(informationRoutes)
app.use(subscribeRoutes)
app.use(viewContentRoutes)
app.use(stadisticsRoutes)
app.use(categoriesRoutes)
app.use(aiDescriptionProductRoutes)
app.use(aiDescriptionProductSeo)
app.use(aiDescriptionCategoryRoutes)
app.use(aiDescriptionCategorySeoRoutes)
app.use(aiTitleProductSeoRoutes)
app.use(aiTitleCategorySeoRoutes)
app.use(promotionalCodeRoutes)
app.use(whatsappRoutes)
app.use(clientsRoutes)
app.use(clientTagRoutes)
app.use(storeDataRoutes)
app.use(chatRoutes)
app.use(payRoutes)
app.use(tagsRoutes)
app.use(webhookRoutes)
app.use(messengerRoutes)
app.use(instagramRoutes)
app.use(notificationsRoutes)

io.on('connection', async (socket) => {
    socket.on('message', async (message) => {
        const messages = await ChatMessage.find({senderId: message.senderId}).select('-senderId -_id').lean()
        const ultimateMessage = messages.reverse()
        if (ultimateMessage[0]?.agent || message.message.toLowerCase() === 'agente') {
            socket.broadcast.emit('message', message)
        }
    })
    socket.on('messageAdmin', (message) => {
        socket.broadcast.emit('messageAdmin', message)
    })
    socket.on('whatsapp', (message) => {
        socket.broadcast.emit('whatsapp', message)
    })
    socket.on('messenger', (message) => {
        socket.broadcast.emit('messenger', message)
    })
    socket.on('instagram', (message) => {
        socket.broadcast.emit('instagram', message)
    })
})

export { io }

server.listen(process.env.PORT || 3000)
console.log('Server on port', process.env.PORT || 3000)
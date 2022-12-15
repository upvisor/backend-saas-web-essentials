import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {connectDB} from './db.js'
import productosRoutes from './routes/productos.routes.js'
import añadirRoutes from './routes/añadir.routes.js'
import bannerRoutes from './routes/banner.routes.js'
import bannerInicioRoutes from './routes/bannerInicio.routes.js'
import comprasRoutes from './routes/compras.routes.js'
import contactoRoutes from './routes/contacto.routes.js'
import datosRoutes from './routes/datos.routes.js'
import finalizarRoutes from './routes/finalizar.routes.js'
import suscripcionesRoutes from './routes/suscripcion.routes.js'
import visualizacionesRoutes from './routes/visualizacion.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'
import cuponesRoutes from './routes/cupones.routes.js'
import gastosRoutes from './routes/gastos.routes.js'
import ingresosRoutes from './routes/ingresos.routes.js'
import importacionesRoutes from './routes/importaciones.routes.js'
import flujoCajaRoutes from './routes/flujoCaja.routes.js'
import inversionRoutes from './routes/inversion.routes.js'
import conversacionRoutes from './routes/conversaciones.routes.js'
import mensajesRoutes from './routes/mensajes.routes.js'
import estadisticasRoutes from './routes/estadisticas.routes.js'
import webplayPlusRouter from './routes/pagos.routes.js'
import {Server as SocketServer} from 'socket.io'
import http from 'http'

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

app.use(productosRoutes)
app.use(añadirRoutes)
app.use(bannerRoutes)
app.use(bannerInicioRoutes)
app.use(comprasRoutes)
app.use(contactoRoutes)
app.use(datosRoutes)
app.use(finalizarRoutes)
app.use(suscripcionesRoutes)
app.use(visualizacionesRoutes)
app.use(usuarioRoutes)
app.use(cuponesRoutes)
app.use(gastosRoutes)
app.use(ingresosRoutes)
app.use(importacionesRoutes)
app.use(flujoCajaRoutes)
app.use(inversionRoutes)
app.use(conversacionRoutes)
app.use(mensajesRoutes)
app.use(estadisticasRoutes)
app.use(webplayPlusRouter)

let users = []

const agregarUsuario = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId, socketId})
}

const removerUsuario = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUsuarios = (userId) => {
    return users.find(user => user.socketId === userId)
}

io.on('connection', (socket) => {
    socket.on('nuevoUsuario', senderId => {
        agregarUsuario(senderId, socket.id)
        io.emit('getUsuarios', users)
    })

    socket.on('enviarMensaje', ({userId, receiverId, text, conversacionId}) => {
        const user = getUsuarios(receiverId)
        io.to(user.socketId).emit('getMensaje', {
            userId,
            text,
            conversacionId
        })
    })

    socket.on('disconnect', () => {
        removerUsuario(socket.id)
        io.emit('getUsuarios', users)
    })
})

server.listen(process.env.PORT || 3000)
console.log('Server on port', process.env.PORT || 3000)
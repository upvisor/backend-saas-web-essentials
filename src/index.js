import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {connectDB} from './db.js'
import productsRoutes from './routes/products.routes.js'
import addCartRoutes from './routes/addCart.routes.js'
import sellsRoutes from './routes/sells.routes.js'
import contactoRoutes from './routes/contacto.routes.js'
import informationRoutes from './routes/information.routes.js'
import subscribeRoutes from './routes/subscribe.routes.js'
import viewContentRoutes from './routes/viewContent.routes.js'
import estadisticasRoutes from './routes/estadisticas.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
import http from 'http'

connectDB()

const app = express()
const server = http.createServer(app)

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
app.use(contactoRoutes)
app.use(informationRoutes)
app.use(subscribeRoutes)
app.use(viewContentRoutes)
app.use(estadisticasRoutes)
app.use(categoriesRoutes)

server.listen(process.env.PORT || 3000)
console.log('Server on port', process.env.PORT || 3000)
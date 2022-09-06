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
import pagosRoutes from './routes/pagos.routes.js'
import suscripcionesRoutes from './routes/suscripcion.routes.js'
import visualizacionesRoutes from './routes/visualizacion.routes.js'

connectDB()

const app = express()

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
app.use(pagosRoutes)
app.use(suscripcionesRoutes)
app.use(visualizacionesRoutes)

app.listen(process.env.PORT || 3000)
console.log('Server on port', process.env.PORT || 3000)
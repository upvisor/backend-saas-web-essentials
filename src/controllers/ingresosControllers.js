import Ingreso from '../models/Ingreso.js'
import axios from 'axios'

export const createIngreso = async (req, res) => {
    try {
        const {fecha, productos, recibido, envio, precio} = req.body
        let producto = ''
        if (productos.length) {
            producto = productos[0]
        } else {
            producto = productos
        }
        const excedente = recibido - envio - precio
        const peticion = await axios.get('https://server-blaspod-production.up.railway.app/importaciones')
        const peticion2 = await axios.get('https://server-blaspod-production.up.railway.app/productos')
        let precioProductos = 0
        if (peticion.data.length !== 0) {
            peticion.data.map(items => {
                items.importacion.map(item => {
                    if (productos.length) {
                        productos.map(product => {
                            if (item.nombre === product) {
                                precioProductos = Math.round(precioProductos + Number(item.precioImportacion) / Number(item.cantidad))
                            } else if (peticion2.data.length !== 0) {
                                peticion2.data.map(e => {
                                    if (product === e.nombre) {
                                        if (e.categorias === item.nombre.toLowerCase()) {
                                            precioProductos = Math.round(precioProductos + (Number(item.precioImportacion) + Number(item.precioAduanas)) / Number(item.cantidad))
                                        }
                                    }
                                })
                            }
                        })
                    } else {
                        if (item.nombre === productos) {
                            precioProductos = Math.round(precioProductos + Number(item.precioImportacion) / Number(item.cantidad))
                        } else {
                            peticion2.data.map(e => {
                                if (productos === e.nombre) {
                                    if (e.categorias === item.nombre.toLowerCase()) {
                                        precioProductos = Math.round(precioProductos + (Number(item.precioImportacion) + Number(item.precioAduanas)) / Number(item.cantidad))
                                    }
                                }
                            })
                        }
                    }
                })
            })
        }
        const ganancia = precio - precioProductos
        const nuevoIngreso = new Ingreso({fecha, productos: producto, recibido, envio, precio, estado: 'Pago iniciado', capital: precioProductos, excedente: excedente, ganancia})
        await nuevoIngreso.save()
        return res.json(nuevoIngreso)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getIngresos = async (req, res) => {
    try {
        const ingresos = await Ingreso.find()
        res.send(ingresos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
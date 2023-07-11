import Sell from '../models/Sell.js'
import bizSdk from 'facebook-nodejs-business-sdk'
import nodemailer from 'nodemailer'

export const createSell = async (req, res) => {
    try {
        const {email, region, city, firstName, lastName, address, departament, phone, coupon, cart, shipping, state, pay, total, fbp, fbc, shippingMethod, shippingState, subscription} = req.body
        const phoneFormat = `56${phone}`
        const CustomData = bizSdk.CustomData
        const EventRequest = bizSdk.EventRequest
        const UserData = bizSdk.UserData
        const ServerEvent = bizSdk.ServerEvent
        const access_token = process.env.APIFACEBOOK_TOKEN
        const pixel_id = process.env.APIFACEBOOK_PIXELID
        const api = bizSdk.FacebookAdsApi.init(access_token)
        let current_timestamp = new Date()
        const url = `${process.env.WEB_URL}/finalizar-compra/`
        const userData = (new UserData())
            .setFirstName(firstName.toLowerCase())
            .setLastName(lastName.toLowerCase())
            .setEmail(email.toLowerCase())
            .setPhone(phoneFormat)
            .setCity(city.toLowerCase())
            .setCountry('cl')
            .setClientIpAddress(req.connection.remoteAddress)
            .setClientUserAgent(req.headers['user-agent'])
            .setFbp(fbp)
            .setFbc(fbc)
        const customData = (new CustomData())
            .setCurrency('clp')
            .setValue(total)
        const serverEvent = (new ServerEvent())
            .setEventName('InitiateCheckout')
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl(url)
            .setActionSource('website')
        const eventsData = [serverEvent]
        const eventRequest = (new EventRequest(access_token, pixel_id))
            .setEvents(eventsData)
            eventRequest.execute().then(
                response => {
                    console.log('Response: ', response)
                },
                err => {
                    console.error('Error: ', err)
                }
            )
        const cuponUpper = coupon?.toUpperCase()
        const sells = Sell.countDocuments()
        const buyOrder = `BLASPOD-${sells}`
        const newSell = new Sell({email, region, city, firstName: firstName[0].toUpperCase() + firstName.substring(1), lastName: lastName[0].toUpperCase() + lastName.substring(1), address, departament, phone: phoneFormat, coupon: cuponUpper, cart, shipping, state, pay, total, shippingMethod, shippingState, buyOrder, subscription})
        await newSell.save()
        return res.json(newSell)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSells = async (req, res) => {
    try {
        const sells = await Sell.find()
        res.send(sells)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSell = async (req, res) => {
    try {
        const sell = await Sell.findById(req.params.id)
        if (!sell) return res.sendStatus(404)
        res.json(sell)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateSell = async (req, res) => {
    try {
        const { sell, shippingCode, fbp, fbc } = req.body
        const updateSell = await Sell.findByIdAndUpdate(req.params.id, {...sell, shippingCode: shippingCode}, {new: true})
        if (sell.shippingState === 'Productos empaquetados') {
            async function main() {
                let transporter = nodemailer.createTransport({
                    host: "smtp.hostinger.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                })
                await transporter.sendMail({
                    from: '"Tienda 1 Maaide" <tienda1@maaide.com>',
                    to: sell.email,
                    subject: `Prueba`,
                    html: `Prueba`
                })
            }
            main().catch(console.error)
        }
        if (sell.shippingState === 'Envío realizado') {
            if (shippingCode) {
                async function main() {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.hostinger.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASSWORD,
                        },
                    })
                    await transporter.sendMail({
                        from: '"Tienda 1 Maaide" <tienda1@maaide.com>',
                        to: sell.email,
                        subject: `Prueba`,
                        html: `Prueba`
                    })
                }
                main().catch(console.error)
            } else {
                async function main() {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.hostinger.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASSWORD,
                        },
                    })
                    await transporter.sendMail({
                        from: '"Tienda 1 Maaide" <tienda1@maaide.com>',
                        to: sell.email,
                        subject: `Prueba`,
                        html: `Prueba`
                    })
                }
                main().catch(console.error)
            }
        }
        // if (sell.state === 'Pago realizado') {
        //     const CustomData = bizSdk.CustomData
        //     const EventRequest = bizSdk.EventRequest
        //     const UserData = bizSdk.UserData
        //     const ServerEvent = bizSdk.ServerEvent
        //     const access_token = process.env.APIFACEBOOK_TOKEN
        //     const pixel_id = process.env.APIFACEBOOK_PIXELID
        //     const api = bizSdk.FacebookAdsApi.init(access_token)
        //     let current_timestamp = new Date()
        //     const url = `${process.env.WEB_URL}/gracias-por-comprar/`
        //     const userData = (new UserData())
        //         .setFirstName(sell.firstName.toLowerCase())
        //         .setLastName(sell.lastName.toLowerCase())
        //         .setEmail(sell.email.toLowerCase())
        //         .setPhone(sell.phone)
        //         .setCity(sell.city.toLowerCase())
        //         .setClientIpAddress(req.connection.remoteAddress)
        //         .setClientUserAgent(req.headers['user-agent'])
        //         .setFbp(fbp)
        //         .setFbc(fbc)
        //     const customData = (new CustomData())
        //         .setCurrency('clp')
        //         .setValue(sell.total)
        //     const serverEvent = (new ServerEvent())
        //         .setEventName('Pucharse')
        //         .setEventTime(current_timestamp)
        //         .setUserData(userData)
        //         .setCustomData(customData)
        //         .setEventSourceUrl(url)
        //         .setActionSource('website')
        //     const eventsData = [serverEvent]
        //     const eventRequest = (new EventRequest(access_token, pixel_id))
        //         .setEvents(eventsData)
        //         eventRequest.execute().then(
        //             response => {
        //                 console.log('Response: ', response)
        //             },
        //             err => {
        //                 console.error('Error: ', err)
        //             }
        //         )
        //     async function main() {
        //         let transporter = nodemailer.createTransport({
        //             host: "smtp.hostinger.com",
        //             port: 465,
        //             secure: true,
        //             auth: {
        //                 user: process.env.EMAIL,
        //                 pass: process.env.EMAIL_PASSWORD,
        //             },
        //         })
        //         await transporter.sendMail({
        //             from: '"Blaspod Store" <contacto@blaspod.cl>',
        //             to: compra.email,
        //             subject: `¡${compra.nombre} Tu compra ha ha sido generada y pagada con exito!`,
        //             html: `<div style="display: flex; margin: 20px;">
        //             <div style="margin: auto; width: 600px;">
        //                 <div style="display: flex; border-bottom: 1px solid #caccd6; padding-bottom: 10px;">
        //                     <a style="margin: auto;" href="https://blaspod.cl/"><img src="https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png" style="width: 270px;" /></a>
        //                 </div>
        //                 <div style="border-bottom: 1px solid #caccd6; padding-bottom: 30px;">
        //                     <h1 style="text-align: center; font-family: poppins, sans-serif; padding-bottom: 0px; font-weight: 500; font-size: 30px;">Te damos las gracias por confiar en nosotros</h1>
        //                     <p style="text-align: center; font-family: poppins, sans-serif; color: #000000; font-size: 16px; font-weight: 300;">¡Hola ${compra.nombre}! Te queriamos comentar que tu compra ya ha sido generada y pagada con exito, cualquier actualización de tu pedido sera informado por este medio.</p>
        //                     <div style="display: flex;">
        //                         <a style="margin: auto; background-color: #303237; color: #fff; padding: 8px 35px; border-radius: 5px; font-family: poppins, sans-serif; text-decoration: none; font-size: 16px;" href="https://blaspod.cl/#/contacto">Contactate con nosotros</a>
        //                     </div>
        //                 </div>
        //                 <div style="display: flex; justify-content: space-between;">
        //                     <div style="padding: 0px 5px; width: 50%;">
        //                         <p style="font-family: poppins, sans-serif; font-size: 15px;">Blaspod Store</p>
        //                         <p style="font-family: poppins, sans-serif; font-size: 15px;">+56996150056</p>
        //                         <p style="font-family: poppins, sans-serif; font-size: 15px;">Comandante chacon 6076, Quinta Normal</p>
        //                     </div>
        //                     <div style="padding: 0px 5px; width: 50%; margin-top: 10px; text-align: end">
        //                         <a style="font-family: poppins, sans-serif; font-size: 15px; display: block;" href="https://blaspod.cl">Pagina web</a>
        //                         <a style="font-family: poppins, sans-serif; font-size: 15px; display: block;" href="https://facebook.com/blaspod">Facebook</a>
        //                         <a style="font-family: poppins, sans-serif; font-size: 15px; display: block;" href="https://instagram.com/blaspod">Instagram</a>
        //                         <a style="font-family: poppins, sans-serif; font-size: 15px; display: block;" href="https://wa.me/message/4H6Q4RGYT4FHK1">Whatsapp</a>
        //                         <a style="font-family: poppins, sans-serif; font-size: 15px; display: block;" href="https://blaspod.cl">Cancelar Suscripción</a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>`
        //         })
        //     }
        //     main().catch(console.error)
        // }
        return res.send(updateSell)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSellByEmail = async (req, res) => {
    try {
        const sells = await Sell.find({email: req.params.id})

        if (!sells) {
            return undefined
        }

        return res.send(sells)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
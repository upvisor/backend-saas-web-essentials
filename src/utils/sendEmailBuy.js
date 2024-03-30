import nodemailer from 'nodemailer'
import { NumberFormat } from '../utils/NumberFormat.js'

export const sendEmailBuy = async ({ sell, storeData }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        post: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    await transporter.sendMail({
        from: storeData?.email,
        to: sell.email,
        subject: `¡${sell.firstName} tu compra ha sido realizada con exito!`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <main style="display: flex;">
                    <div style="margin: auto; width: 100%; padding: 12px; max-width: 600px;">
                        <div style="display: flex;">
                            <a style="margin: auto;" target="_blank" href="https://tienda-1.vercel.app/">${storeData?.logo.url ? `<img style="width: 200px;" src="${storeData.logo.url}" />` : '<p style="font-size: 36px;">TIENDA</p>'}</a>
                        </div>
                        <h1 style="font-weight: 500; margin-bottom: 0px; color: #2A2A2A;">Aqui tienes todos los detalles de tu compra</h1>
                        <p style="font-size: 16px; color: #2D2D2D;">Hola ${sell.firstName}, tu compra ha sido realizada con exito, aqui te dejamos todos los detalles.</p>
                        <div style="color: #2D2D2D;">
                            ${sell.cart.map(product => {
                                return `
                                    <div key={product._id} style="display: flex;">
                                        <img src=${product.image} style="width: 100px; height: 100px; margin-right: 6px; border: 1px solid #B9B9B9; border-radius: 6px;" />
                                        <div>
                                            <p style="font-size: 16px;">${product.name}</p>
                                            <p style="font-size: 16px;">Cantidad: ${product.quantity}</p>
                                        </div>
                                        <p style="font-size: 16px; margin-left: auto; margin-top: auto; margin-bottom: auto;">$${NumberFormat(product.price)}</p>
                                    </div>
                                `
                            })}
                            <p style="font-size: 16px;">Envío: $${NumberFormat(sell.shipping)}</p>
                            <p style="font-size: 16px;">Total: $${NumberFormat(sell.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0) + Number(sell.shipping))}</p>
                        </div>
                        <hr>
                        <div style="color: #2D2D2D;">
                            <div style="width: 100%; display: flex; margin-bottom: 10px;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    ${storeData?.instagram ? `<a style="padding-right: 30px;" href="${storeData.instagram}" target="_blank"><img style="width: 25px; height: 25px;" src="https://cdn.icon-icons.com/icons2/836/PNG/512/Instagram_icon-icons.com_66804.png" /></a>` : ''}
                                    ${storeData?.facebook ? `<a style="padding-right: 30px;" href="${storeData.facebook}" target="_blank"><img style="width: 25px; height: 25px;" src="https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png" /></a>` : ''}
                                    ${storeData?.tiktok ? `<a style="padding-right: 30px;" href="${storeData.tiktok}" target="_blank"><img style="width: 25px; height: 25px;" src="https://cdn.icon-icons.com/icons2/2972/PNG/512/tiktok_logo_icon_186896.png" /></a>` : ''}
                                    ${storeData?.whatsapp ? `<a href="${storeData.whatsapp}" target="_blank"><img style="width: 25px; height: 25px;" src="https://cdn.icon-icons.com/icons2/729/PNG/512/whatsapp_icon-icons.com_62756.png" /></a>` :''}
                                </div>
                            </div>
                            <div style="width: 100%; display: flex; margin-bottom: 4px;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span>${storeData?.email ? storeData.email : ''}</span>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex; margin-bottom: 10px;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span>${storeData?.phone ? `+56${storeData.phone}` : ''}</span>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span style="margin-right: 5px;">Dejar de recibir correos de esta tienda</span>
                                    <a href="/" target="_blank">Cancelar suscripción</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </body>
        </html>
        `
    })
}
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
        subject: '¡Tu compra ha sido realizada con exito!',
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
                        <h1 style="font-weight: 500; text-align: center; margin-bottom: 0px;">Aqui tienes todos los detalles de tu compra</h1>
                        <p style="text-align: center; font-size: 16px;">Hola ${sell.firstName}, tu compra ha sido realizada con exito, aqui te dejamos todos los detalles.</p>
                        <div>
                            ${sell.cart.map(product => {
                                return `
                                    <div key={product._id} style="display: flex;">
                                        <img src=${product.image} style="width: 50px; margin-right: 6px;" />
                                        <p style="margin-right: 6px;">${product.name}</p>
                                        <p style="margin-right: 6px;">${product.quantity}</p>
                                        <p>$${NumberFormat(product.price)}</p>
                                    </div>
                                `
                            })}
                            <p>Envío: $${NumberFormat(sell.shipping)}</p>
                            <p>Total: $${NumberFormat(sell.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0) + Number(sell.shipping))}</p>
                        </div>
                        <div style="border-top: 1px solid #CACACA; padding: 12px;">
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
                                    <span style="font-size: 14px;">${storeData?.email ? storeData.email : ''}</span>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex; margin-bottom: 10px;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span style="font-size: 14px;">${storeData?.phone ? storeData.phone : ''}</span>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span style="font-size: 14px; margin-right: 5px;">Dejar de recibir correos de esta tienda</span>
                                    <a style="font-size: 14px;" href="/" target="_blank">Cancelar suscripción</a>
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
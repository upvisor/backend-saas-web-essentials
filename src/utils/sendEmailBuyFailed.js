import nodemailer from 'nodemailer'
import { NumberFormat } from '../utils/NumberFormat.js'

export const sendEmailBuyFailed = async ({ sell, storeData }) => {
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
        subject: '¡Ups! Tu compra no ha podido ser realizada con exito',
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
                        <h1 style="font-weight: 500; text-align: center; margin-bottom: 0px;">Tu compra no ha sido realizada</h1>
                        <p style="text-align: center; font-size: 16px;">Hola ${sell.firstName}, tu compra no ha podido ser realizada con exito, puedes hacer click en el boton de abajo para volver a intentarlo.</p>
                        <div>
                            ${sell.cart.map(product => {
                                return `
                                    <div key={product._id} style="display: flex;">
                                        <img src="${product.image}" style="width: 50px; margin-right: 6px;" />
                                        <p style="margin-right: 6px;">${product.name}</p>
                                        <p style="margin-right: 6px;">${product.quantity}</p>
                                        <p>${NumberFormat(product.price)}</p>
                                    </div>
                                `
                            })}
                            <p>Envío: $${NumberFormat(sell.shipping)}</p>
                            <p>Total: $${NumberFormat(sell.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0) + Number(sell.shipping))}</p>
                        </div>
                        <div style="display: flex;">
                            <a href="https://tienda-1.vercel.app/finalizar-compra/" target="_blank" style="padding: 8px 21px; font-family: 'poppins', sans-serif; border: none; text-decoration: none; color: white; font-size: 16px; margin: auto; width: fit-content; margin-bottom: 18px; cursor: pointer; background-color: #3478F5;">Volver a intentarlo</a>
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
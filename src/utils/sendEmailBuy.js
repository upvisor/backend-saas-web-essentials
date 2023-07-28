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
        from: 'contacto@maaide.com',
        to: sell.email,
        subject: '¡Tu compra ha sido realizada con exito!',
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <style>
                    body {
                        font-family: 'Poppins', Arial, sans-serif;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        font-family: 'Montserrat', Arial, sans-serif;
                    }
                </style>
            </head>
            <body>
                <main style="display: flex;">
                    <div style="margin: auto; width: 100%; padding: 12px; max-width: 600px;">
                        <div style="display: flex;">
                            <a style="margin: auto;" target="_blank" href="https://tienda-1.vercel.app/"><img style="width: 300px;" src="https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png" /></a>
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
                                    <a style="padding-right: 30px;" href="/"><img style="width: 20px; height: 20px;" src="https://cdn.icon-icons.com/icons2/836/PNG/512/Instagram_icon-icons.com_66804.png" /></a>
                                    <a style="padding-right: 30px;" href="/"><img style="width: 20px; height: 20px;" src="https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png" /></a>
                                    <a style="padding-right: 30px;" href="/"><img style="width: 20px; height: 20px;" src="https://cdn.icon-icons.com/icons2/2972/PNG/512/tiktok_logo_icon_186896.png" /></a>
                                    <a href="/"><img style="width: 20px; height: 20px;" src="https://cdn.icon-icons.com/icons2/729/PNG/512/whatsapp_icon-icons.com_62756.png" /></a>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex; margin-bottom: 4px;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span style="font-size: 14px;">${storeData.email}</span>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex; margin-bottom: 10px;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span style="font-size: 14px;">${storeData.phone}</span>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: auto; display: flex; margin: auto;">
                                    <span style="font-size: 14px; margin-right: 5px;">Dejar de recibir correos de esta tienda</span>
                                    <a style="font-size: 14px;" href="/">Cancelar suscripción</a>
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
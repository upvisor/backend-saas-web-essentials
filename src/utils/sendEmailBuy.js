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
                <title>Document</title>
            </head>
            <body>
                <main style="display: flex;">
                    <div style="margin: auto; width: 100%; padding: 12px; max-width: 600px;">
                        <div style="display: flex;">
                            <a style="margin: auto;" target="_blank" href="https://tienda-1.vercel.app/"><img style="width: 300px;" src="https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png" /></a>
                        </div>
                        <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 500; text-align: center; margin-bottom: 0px;">Aqui tienes todos los detalles de tu compra</h1>
                        <p style="font-family: 'poppins', sans-serif; text-align: center; font-size: 16px;">Hola ${sell.firstName}, tu compra ha sido realizada con exito, aqui te dejamos todos los detalles.</p>
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
                        <div style="border-top: 1px solid #CACACA; padding: 12px; display: flex;">
                            <div style="margin-right: 10px">
                                <a target="_blank" href="https://tienda-1.vercel.app/" style="font-family: 'poppins', sans-serif; display: block;">${storeData.name}</a>
                                <a target="_blank" href="https://tienda-1.vercel.app/" style="font-family: 'poppins', sans-serif; display: block;">${storeData.email}</a>
                                <a target="_blank" href="https://tienda-1.vercel.app/" style="font-family: 'poppins', sans-serif; display: block;">${storeData.phone}</a>
                            </div>
                            <div style="margin-left: auto;">
                                <div style="display: flex;">
                                    <a style="font-family: 'poppins', sans-serif; margin-left: auto;">${storeData.address}</a>
                                </div>
                                <a style="font-family: 'poppins', sans-serif; display: block;">${storeData.city}, ${storeData.region}</a>
                            </div>
                        </div>
                    </div>
                </main>
            </body>
        </html>
        `
    })
}
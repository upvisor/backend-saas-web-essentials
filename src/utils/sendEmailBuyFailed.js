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
        from: 'ayuda@maaide.com',
        to: sell.email,
        subject: '¡Ups! Tu compra no ha podido ser realizada con exito',
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
                        <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 500; text-align: center; margin-bottom: 0px;">Tu compra no ha sido realizada</h1>
                        <p style="font-family: 'poppins', sans-serif; text-align: center; font-size: 16px;">Hola ${sell.name}, tu compra no ha podido ser realizada con exito, puedes hacer click en el boton de abajo para volver a intentarlo.</p>
                        <div>
                            ${sell.cart.map(product => {
                                return `
                                    <div key={product._id} style="display: flex;">
                                        <img src={product.image} style="width: 50px;" />
                                        <p>{product.name}</p>
                                        <p>{product.quantity}</p>
                                        <p>${NumberFormat(product.price)}</p>
                                    </div>
                                `
                            })}
                            <div style="display: flex;">
                                <p>Total:</p>
                                <p>$${NumberFormat(sell.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0))}</p>
                            </div>
                        </div>
                        <div style="display: flex;">
                            <a href="https://tienda-1.vercel.app/finalizar-compra/" target="_blank" style="padding: 8px 21px; font-family: 'poppins', sans-serif; border: none; text-decoration: none; color: white; font-size: 16px; margin: auto; width: fit-content; margin-bottom: 18px; cursor: pointer; background-color: #3478F5;">Volver a intentarlo</a>
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
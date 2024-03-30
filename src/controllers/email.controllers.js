import nodemailer from 'nodemailer'

export const sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.params.id,
            subject: req.body.subject,
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Correo Electrónico</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #2D2D2D;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            box-sizing: border-box;
                            background-color: #ffffff;
                            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                        }
                        .parrafo {
                            font-size: 16px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div>
                            <p class="parrafo">${req.body.email.replace(/\n/g, "<br>")}</p>
                        </div>
                        <hr>
                        <p>Para cualquier consulta, responde este email o contactate con ${process.env.EMAIL}</p>
                    </div>
                </body>
                </html>
            `
        }
        await transporter.sendMail(mailOptions)
        return res.status(200).json({ message: 'Correo electrónico enviado correctamente' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};
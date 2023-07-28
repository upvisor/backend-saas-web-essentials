import nodemailer from 'nodemailer'

export const sendEmailCampaign = async ({ address, name, affair, title, paragraph, buttonText, url, storeData }) => {
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
        to: address,
        subject: affair,
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
                        <h1 style="font-weight: 500; text-align: center; margin-bottom: 0px;">${title}</h1>
                        <p style="text-align: center; font-size: 16px;">${paragraph.replace('${name}', name)}</p>
                        <div style="display: flex;">
                            <a href="${url}" target="_blank" style="padding: 8px 21px; border: none; text-decoration: none; color: white; font-size: 16px; margin: auto; width: fit-content; margin-bottom: 18px; cursor: pointer; background-color: #3478F5;">${buttonText}</a>
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
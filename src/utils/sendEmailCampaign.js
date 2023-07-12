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
    const trackingPixelUrl = `https://server-production-e234.up.railway.app/campaign/track/${encodeURIComponent(address)}?campaign=${encodeURIComponent(affair)}`
    await transporter.sendMail({
        from: 'ayuda@maaide.com',
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
                <title>Document</title>
            </head>
            <body>
                <main style="display: flex;">
                    <div style="margin: auto; width: 100%; padding: 12px; max-width: 600px;">
                        <div style="display: flex;">
                            <a style="margin: auto;" target="_blank" href="https://tienda-1.vercel.app/"><img style="width: 300px;" src="https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png" /></a>
                        </div>
                        <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 500; text-align: center; margin-bottom: 0px;">${title}</h1>
                        <p style="font-family: 'poppins', sans-serif; text-align: center; font-size: 16px;">${paragraph.replace('${name}', name)}</p>
                        <div style="display: flex;">
                            <a href="${url}" target="_blank" style="padding: 8px 21px; font-family: 'poppins', sans-serif; border: none; text-decoration: none; color: white; font-size: 16px; margin: auto; width: fit-content; margin-bottom: 18px; cursor: pointer; background-color: #3478F5;">${buttonText}</a>
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
                    <img src="${trackingPixelUrl}" alt="Pixel de seguimiento" width="1" height="1">
                </main>
            </body>
        </html>
        `
    })
}
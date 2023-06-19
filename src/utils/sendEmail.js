import nodemailer from 'nodemailer'

export const sendEmail = ({ address, affair, title, paragraph, buttonText, url }) => {
    let transporter = nodemailer.createTransport({
        host: '',
        post: 465,
        secure: true,
        auth: {
            user: '',
            pas: ''
        }
    })
    const message = {
      from: 'contacto@blaspod.cl',
      to: address,
      subject: affair,
      text: `<!DOCTYPE html>
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
                  <div style="margin: auto; width: 600px; padding: 12px; display: flex; flex-direction: column; gap: 4px;">
                      <a style="margin: auto;" target="_blank" href="https://tienda-1.vercel.app/"><img style="width: 300px;" src="https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png" /></a>
                      <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 500; text-align: center; margin-bottom: 0px;">${title}</h1>
                      <p style="font-family: 'poppins', sans-serif; text-align: center;">${paragraph}</p>
                      <a href="https://tienda-1.vercel.app${url}" target="_blank" style="padding: 8px 21px; font-family: 'poppins', sans-serif; border: none; text-decoration: none; color: white; font-size: 16px; margin: auto; width: fit-content; margin-bottom: 18px; cursor: pointer; background-color: #3478F5;">${buttonText}</a>
                      <div style="border-top: 1px solid #CACACA; padding: 12px; display: flex; gap: 8px; justify-content: space-between;">
                          <div style="display: flex; flex-direction: column; gap: 8px;">
                              <a target="_blank" href="https://tienda-1.vercel.app/" style="font-family: 'poppins', sans-serif;">Blaspod</a>
                              <a target="_blank" href="https://tienda-1.vercel.app/" style="font-family: 'poppins', sans-serif;">contacto@blaspod.cl</a>
                              <a target="_blank" href="https://tienda-1.vercel.app/" style="font-family: 'poppins', sans-serif;">950126640</a>
                          </div>
                          <div style="display: flex; flex-direction: column; gap: 8px; text-align: right;">
                              <a style="font-family: 'poppins', sans-serif;">Comandante Chacon 6076</a>
                              <a style="font-family: 'poppins', sans-serif;">Quinta Normal, Región Metropolitana</a>
                          </div>
                      </div>
                  </div>
              </main>
          </body>
      </html>`,
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error)
      } else {
        console.log('Correo enviado:', info.response)
      }
    })
}
export const sendEmail = () => {
    const mensaje = {
      from: 'tu@correo.com',
      to: 'destinatario@correo.com',
      subject: 'Correo programado',
      text: 'Este correo fue enviado en una fecha específica.',
    }
    transporter.sendMail(mensaje, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error)
      } else {
        console.log('Correo enviado:', info.response)
      }
    })
}
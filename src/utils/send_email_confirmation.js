import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})


const sendEmail = async (userEmail, verification_code) => {

    const emailConfig = {
        from: `Heber <${process.env.USER}>`,
        to: `${userEmail}`,
        subject: "Confirmação de cadastro",
        html: `Para confirmar seu cadastro na nossa plataforma: ${verification_code}`,
    }

    // ! testar se o endereço pode receber emails
    return new Promise((resolve, reject) => {
        transporter.sendMail(emailConfig, (error, info) => {
            if (error) {
                reject()
            } else {
                resolve()
            }
        })
    })

}


export default sendEmail
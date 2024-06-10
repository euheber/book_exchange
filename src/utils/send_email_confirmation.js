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

const sendEmail = async (username, userEmail, token) => {
    const emailConfig = {
        from: `Heber <${process.env.USER}>`,
        to: `${userEmail}`,
        subject: "Confirmação de cadastro",
        html: `Olá, ${username} Para registrar seus livros enviados, clique <a href=${token}>aqui</a>`,
    }

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
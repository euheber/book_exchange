import nodemailer from "nodemailer"
import generateToken from "../utils/generate_token.js"

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

const sendEmail = async (username, email, id) => {
    const token = await generateToken({username, email, id})

    const emailConfig = {
        from: `Heber <${process.env.USER}>`,
        to: `${email}`,
        subject: "Confirmação de cadastro",
        html: `Olá, ${username} Para registrar seus livros enviados: ${token}`,
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
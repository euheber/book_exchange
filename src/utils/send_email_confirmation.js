import nodemailer from "nodemailer"
import generateToken from "./generate_token.js"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service:"gmail",
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})



const sendEmail = async (userEmail) => {
    const token = await generateToken(userEmail)

    const link = `http://localhost:3000/api/v1/user/emailconfirm/${token}`
    const emailConfig = { 
        from: `Heber <${process.env.USER}>`,
        to: `${userEmail}`,
        subject: "Confirmação de cadastro",
        html: `Clique <a href=${link}>aqui</a> pra confirmar seu cadastro`,
    }
    

    return new Promise((resolve, reject) => { 
        transporter.sendMail(emailConfig, (error, info) => { 
            if(error){ 
                reject(new Error("Erro ao enviar o email."))
            } else { 
                resolve(token)
            }
        })
    })

}


export default sendEmail
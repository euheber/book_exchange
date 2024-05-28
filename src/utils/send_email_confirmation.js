import nodemailer from "nodemailer"
import generateVerificationCode from "./generate_verification_code.js"

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

    const code = await generateVerificationCode()

    const link = `http://localhost:3000/api/v1/user/confirmUser/${code}`
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
                resolve()
            }
        })
    })

}


export default sendEmail
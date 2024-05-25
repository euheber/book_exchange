import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"


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
    const token = jwt.sign({data:userEmail}, process.env.SECRET , {expiresIn: '24h'})

    const emailConfig = { 
        from: `Heber <${process.env.USER}>`,
        to: `${userEmail}`,
        subject: "Confirmação de cadastro",
        html: `Aqui está o seu token de acesso: ${token}`,
    }
    

    return new Promise((resolve, reject) => { 
        transporter.sendMail(emailConfig, (error, info) => { 
            if(error){ 
                console.error(error)
                reject(new Error("Erro ao enviar o email."))
            } else { 
                resolve(token)
            }
        })
    })

}


export default sendEmail
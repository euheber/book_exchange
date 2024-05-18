import nodemailer from "nodemailer"

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


const emailConfig = { 
    from: `quasedev <${process.env.USER}>`,
    to: `${process.env.USER}`,
    subject: "email testing",
    html: "<h1>Este é apenas um teste para confirmação de email.</h1>",
    text: "apenas testando a confirmação de email"
}

transporter.sendMail(emailConfig, (info, error)=> { 
    if(error){ 
        console.log(error)
    } else { 
        return "email enviado com sucesso"
    }
})
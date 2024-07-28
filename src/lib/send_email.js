import nodemailer from "nodemailer";
import generateToken from "../utils/generate_token.js";


const sendEmail = async (username, email, id) => {
    const token = await generateToken({ username, id })
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    })


    const message = await transporter.sendMail(
        {
            from: { name: "Equipe Ecolib", address: "ecolib@mail.com" },
            to: `${email}`,
            subject: "Confirmação de cadastro",
            html: `
e de email</title>
  </head>
  <body>
    <h1>Olá, ${username}</h1>

    <p>Você pode registrar seus livros por aqui: <a href="/">${token}</a></p>
  </body>
</html>`})
    console.log(nodemailer.getTestMessageUrl(message));
}



export default sendEmail
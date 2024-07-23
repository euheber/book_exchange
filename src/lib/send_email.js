import nodemailer from "nodemailer"
import generateToken from "../utils/generate_token.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const getHTMLTemplate = async (username, token) => {
    const templatePath = path.join(__dirname, "..", "templates", "email.html");
    let htmlContent = await fs.promises.readFile(templatePath, "utf-8");

    htmlContent = htmlContent.replace("{username}", username);
    htmlContent = htmlContent.replace("{token}", token);

    return htmlContent;
}

const sendEmail = async (username, email, id) => {
    const token = await generateToken({ username, email, id })
    const htmlContent = await getHTMLTemplate(username, token)

    const emailConfig = {
        from: { name: "Equipe Ecolib", address: "ecolib@mail.com"},
        to: `${email}`,
        subject: "Confirmação de cadastro",
        html: htmlContent,
    }
    console.log("mandando email?")
    const message = await transporter.sendMail(emailConfig)
    console.log(nodemailer.getTestMessageUrl(message));
}



export default sendEmail
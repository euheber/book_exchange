import nodemailer from "nodemailer"
import generateToken from "../utils/generate_token.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
        from: `Heber <${process.env.USER}>`,
        to: `${email}`,
        subject: "Confirmação de cadastro",
        html: htmlContent,
    }

    return transporter.sendMail(emailConfig)

}



export default sendEmail
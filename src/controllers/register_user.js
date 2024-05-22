import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import sendEmail from "../utils/send_email_confirmation.js"
import prisma from "../lib/prismaClient.js"

async function register_books(req, res, next) {
    const { name, email, tracking_code } = req.body
    if(!name || !email || !tracking_code){
       return next(new badRequest("Você precisa preencher todos os campos"))
    }
    try {
        const user = await prisma.user.create({ data: { name, email, tracking_code } })
        sendEmail(user.email)
        res.status(200).send("Enviamos um email com os dados para confirmação do cadastro.")
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return next(new badRequest('Usuário já cadastrado'))
            }
        }
    }
}

export default register_books
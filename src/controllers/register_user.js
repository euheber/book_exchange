import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import sendEmail from "../utils/send_email_confirmation.js"
import prisma from "../lib/prismaClient.js"
import generateVerificationCode from "../utils/generate_verification_code.js"

async function register_books(req, res, next) {
    const { name, email } = req.body

    if (!name || !email) {
        return next(new badRequest("Você precisa preencher todos os campos"))
    } 

    try {
        const verification_code = await generateVerificationCode()
        const user = await prisma.user.create({ data: { name, email, verification_code } })
        await sendEmail(user.email, verification_code)
        res.status(200).send("Enviamos um email com os dados para confirmação do cadastro.")
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return next(new badRequest('Usuário já cadastrado'))
            }
        }

        if (e instanceof Prisma.PrismaClientValidationError) {
            return next(new badRequest('Para registrar um usuário, envie apenas os campos: nome, email, e código de verificaçao.'))
        }
    }
}

export default register_books
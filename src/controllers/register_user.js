import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import sendEmail from "../utils/send_email_confirmation.js"
import prisma from "../lib/prismaClient.js"
import generateVerificationCode from "../utils/generate_verification_code.js"
import { StatusCodes } from "http-status-codes"

async function register_books(req, res, next) {
    const { name, email } = req.body

    try {
        const verification_code = await generateVerificationCode()
        const user = await prisma.user.create({ data: { name, email, verification_code } })
        await sendEmail(user.email, verification_code)
        res.status(200).send("Enviamos um email com os dados para confirmação do cadastro.")
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e)
            if (e.code === 'P2002') {
                return next(new badRequest('Usuário já cadastrado'))
            }
        }

        if (e instanceof Prisma.PrismaClientValidationError) {
            return next(new badRequest('Para registrar um usuário, envie apenas os campos: nome, email, e código de verificaçao.'))
        }

        console.log(e)
    }
}

export default register_books
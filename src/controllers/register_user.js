import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import prisma from "../lib/prismaClient.js"
import sendEmail from "../utils/send_email.js"
import generateToken from "../utils/generate_token.js"


async function register_books(req, res, next) {
    const { name, email } = req.body
 
    try {
        const user = await prisma.user.create({ data: { name, email } })
        const token = await generateToken({name, email, id:user.id})
        await sendEmail( name, email, token)

        res.status(200).json({ msg: `Enviamos um email com os dados para confirmação do cadastro para o endereço: ${email}`, link: "Este não é seu email? Clique aqui e atualize" })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {

            if (e.code === 'P2002') {
                return next(new badRequest('Usuário já cadastrado'))
            }
        }

        if (e instanceof Prisma.PrismaClientValidationError) {
            return next(new badRequest('Para registrar um usuário, envie apenas os campos: nome e email.'))
        }

    }
}

export default register_books
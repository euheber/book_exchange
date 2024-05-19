import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient.js"
import { badRequest } from "../errors/index.js"
import sendEmail from "../utils/send_email_confirmation.js"


async function register_books(req, res, next) {
    const { name, email, tracking_code } = req.body

    try {
        const user = await prisma.user.create({ data: { name, email, tracking_code } })

        res.status(200).send(`Aqui está o seu id: ${user.id}. Não perca este identificador ou não conseguirá ter acesso aos seus dados na nossa plataforma`)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code = 'P2002') {
                 next(new badRequest('Usuário já cadastrado'))
            }
        }
    }


}

export default register_books
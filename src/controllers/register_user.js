import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import prisma from "../lib/prismaClient.js"
import sendEmail from "../utils/send_email.js"
import generateToken from "../utils/generate_token.js"
import generateTrackingCode from "../utils/generate_tracking_code.js"


async function register_books(req, res, next) {
    const { name, email, city } = req.body

    try {
        const tracking_code = generateTrackingCode()
        const user = await prisma.user.create({ data: { name, email, tracking_code, city } })

        await sendEmail(name, email, user.id)
        const token = await generateToken({ name: user.name, email: user.email, id: user.id })
        res.status(200).json({ msg: `Enviamos um email com os dados para confirmação do cadastro para o endereço: ${email}`, update_email: `http://localhost:3000/api/v1/user/email/${token}` })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {

            if (e.code === 'P2002') {
                return next(new badRequest('Usuário já cadastrado.'))
            }
        }

    }
}

export default register_books
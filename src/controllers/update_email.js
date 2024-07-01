import { StatusCodes } from "http-status-codes"
import { badRequest } from "../errors/index.js"
import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient.js"
import sendEmail from "../utils/send_email.js"


async function updateEmail(req, res, next) {
    const { updatedEmail, decodedToken } = req.body
    try {
        await prisma.user.update({
            where: {
                email: decodedToken.email
            },
            data: {
                email: updatedEmail
            }
        })
        await sendEmail(decodedToken.name, updatedEmail, decodedToken.id)
        res.status(StatusCodes.OK).json({ msg: "Email atualizado com sucesso. Verifique sua caixa de entrada." })
    } catch (e) {

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return next(new badRequest("Não foi possível atualizar o email do usuário: Email não consta no nosso banco de dados. Você tem certeza que esse é o endereço cadastrado?"))
        }
    }
}

export default updateEmail
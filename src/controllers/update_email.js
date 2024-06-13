import { StatusCodes } from "http-status-codes"
import { badRequest } from "../errors/index.js"
import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient.js"

const updateEmail = async (req, res, next) => {
    const { email, updatedEmail } = req.body
    const token = req.params
    try {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                email: updatedEmail
            }
        })

        res.status(StatusCodes.OK).json({ msg: "Email atualizado com sucesso. Verifique sua caixa de entrada." })
    } catch (e) {

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            next(new badRequest("Não foi possível atualizar o estado do usuário: Email não consta no nosso banco de dados"))
        }
    }
}

export default updateEmail
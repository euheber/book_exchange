import { StatusCodes } from "http-status-codes"
import { badRequest } from "../errors/index.js"
import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient.js"
import sendEmail from "../lib/send_email.js"
import { validationResult } from "express-validator"


async function updateEmail(req, res, next) {

    const result = validationResult(req)

    if(!result.isEmpty()){ return next(new badRequest("You need to provide the right infos", result))}

    const { updatedEmail, decodedToken } = req.body
    console.log({ updatedEmail, decodedToken })
    try {
        await prisma.user.update({
            where: {
                id: decodedToken.id
            },
            data: {
                email: updatedEmail
            }
        })
        await sendEmail(decodedToken.username, updatedEmail, decodedToken.id)
        res.status(StatusCodes.OK).json({ msg: "Email atualizado com sucesso. Verifique sua caixa de entrada." })
    } catch (e) {

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return next(new badRequest("Não foi possível atualizar as infomrações usuário"))
        }

        return next(new Error(e))
    }
}

export default updateEmail
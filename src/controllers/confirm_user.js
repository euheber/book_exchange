import { StatusCodes } from "http-status-codes"
import { badRequest } from "../errors/index.js"
import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient.js"

const confirmUser = async (req, res, next) => {
    const { code } = req.body

    try {
        await prisma.user.update({
            where: {
                verification_code: code
            },
            data: {
                validation: true
            }
        })

        res.status(StatusCodes.OK).send("Conta verificada com sucesso.")
    } catch (e) {
        if(e instanceof Prisma.PrismaClientValidationError){ 
            next(new badRequest("Dado informado nao existe no campo do usuário"))
        } 

        if(e instanceof Prisma.PrismaClientKnownRequestError){ 
            next(new badRequest("Não foi possível atualizar o estado do usuário: Id do usuário inválido"))
        }
    }
}

export default confirmUser
import { StatusCodes } from "http-status-codes"
import { badRequest } from "../errors/index.js"
import prisma from "../lib/prismaClient.js"

const confirmUser = async (req, res, next) => {
    const { code } = req.body
    if(code === ""){ 
        next(new badRequest("Você precisa preencher todos os campos"))
    }
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
        next(new badRequest("usuário não encontrado"))
    }
}

export default confirmUser
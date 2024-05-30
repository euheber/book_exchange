import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import { badRequest } from "../errors/index.js"


const confirmUser = async (req, res, next) => {
    const { code } = req.body
    console.log(code)
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
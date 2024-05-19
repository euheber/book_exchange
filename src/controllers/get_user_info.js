
import badRequest from "../errors/badRequest.js"
import prisma from "../lib/prismaClient.js"
import { StatusCodes } from "http-status-codes"

const getUserInfo = async (req, res, next) => {
    const { id } = req.params
    try {

        const user = await prisma.user.findUnique({
            where: { id },
            include: { _count: true, books: true },
        })

        if (user != null) {
            res.status(StatusCodes.OK).send(user)
        } else {
            throw new badRequest("Usuário não encontrado.")
        }
    } catch (e) {
        next(e)
    }
}

export default getUserInfo